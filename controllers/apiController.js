const request = require("request");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const PostOverview = require("../models/postOverview");
const PostDetail = require("../models/postDetail");
const Response = require("../models/response");
const Tag = require("../models/tag");

exports.home = (req, res) => {
  const url = `https://medium.com/search?q=${req.params.tag}`;
  let time = Date.now();
  request(url, function (err, resp, body) {
    console.log(Date.now() - time);
    if (err) {
      res.status(500).json({
        status: "failed",
        err,
      });
      throw err;
    }
    if (body) {
      let $ = cheerio.load(body);
      console.log(Date.now() - time);

      let relatedTags = [];
      $("ul.tags a").each((i, elem) => {
        relatedTags.push($(elem).text());
      });

      let list = [];
      $("div.js-postListHandle > div > div").each((ind, elem) => {
        list.push({
          title: $(elem).find("h3").text(),
          author: $(elem)
            .find(".postMetaInline-authorLockup > a:first-child")
            .text(),
          avatar: $(elem).find(".avatar-image").attr("src"),
          date: $(elem).find("time").text(),
          readingTime: $(elem).find("span.readingTime").attr("title"),
          image: $(elem).find(".section-content img").attr("src"),
          description: $(elem).find("p").text(),
          postId: $(elem).find(".postArticle-content > a").attr("data-post-id"),
        });
      });
      console.log(Date.now() - time);
      res.status(200).json({
        status: "success",
        data: {
          length: list.length,
          relatedTags,
          list,
        },
      });
    }
  });
};

exports.searchByTag = async (val, limit, socket) => {
  let time = Date.now();
  // FIRTS CHECK INTO DB
  try {
    const tags = await Tag.findOne({ tag: val }).lean();
    let posts = await PostOverview.find({ tag: val }).limit(limit).lean();
    if (tags && posts.length >= limit) {
      tags.relatedTags.forEach((tag) => {
        socket.emit("relatedTagsResp", tag);
      });

      posts = posts.slice(limit - 10);
      posts.forEach((post) => {
        socket.emit("postResponse", post);
      });
      socket.emit("crawlingCompleted", Date.now() - time);
      return;
    }
  } catch (err) {
    console.error(err);
  }

  // IF NOT IN DB THEN CRAWL IT
  const url = `https://medium.com/tag/${val}?limit=${limit}`;
  request(url, function (err, resp, body) {
    console.log(Date.now() - time);
    if (err) {
      socket.emit("postResponse", null, err);
      throw err;
    }
    if (body) {
      let $ = cheerio.load(body);
      console.log(Date.now() - time);

      const relatedTags = [];
      $("ul.tags a").each((i, elem) => {
        var text = $(elem).text();
        socket.emit("relatedTagsResp", text);
        relatedTags.push(text);
      });

      const postOverList = [];
      $(".postArticle")
        .slice(limit - 10)
        .each(async (_ind, elem) => {
          var postOverview = {
            title: $(elem).find("h3").text(),
            subtitle: $(elem).find("h4").text(),
            author: $(elem)
              .find(".postMetaInline-authorLockup > a:first-child")
              .text(),
            avatar: $(elem).find(".avatar-image").attr("src"),
            date: $(elem).find("time").text(),
            readingTime: $(elem).find("span.readingTime").attr("title"),
            image: $(elem).find(".section-content img").attr("src"),
            description: $(elem).find("p").text(),
            postId: $(elem).attr("data-post-id"),
          };
          socket.emit("postResponse", postOverview);
          postOverview.tag = val;
          postOverList.push(postOverview);
        });
      socket.emit("crawlingCompleted", Date.now() - time);
      console.log(Date.now() - time);
      // STORE IN DB
      PostOverview.create(postOverList);
      Tag.create({
        tag: val,
        relatedTags,
      });
    }
  });
};

exports.post = async (req, res) => {
  // FIRTS CHECK IN DB
  try {
    const post = await PostDetail.findOne({ postId: req.params.id }).lean();
    if (post) {
      return res.status(200).json({
        status: "success",
        data: post,
      });
    }
  } catch (er) {
    console.error(err);
  }

  // IF NOT IN DB THEN GET FROM API
  const url = `https://medium.com/_/api/posts/${req.params.id}`;
  try {
    const response = await fetch(url);
    let text = await response.text();

    text = text.substring(16);
    const body = JSON.parse(text);

    const data = {
      title: body.payload.value.title,
      subtitle: body.payload.value.content.subtitle,
      author: Object.values(body.payload.references.User)[0].name,
      avatar:
        "https://miro.medium.com/fit/c/96/96/" +
        Object.values(body.payload.references.User)[0].imageId,
      readingTime: Math.ceil(body.payload.value.virtuals.readingTime),
      date: body.payload.value.firstPublishedAt,
      article: body.payload.value.content.bodyModel.paragraphs,
      tags: body.payload.value.virtuals.tags.map((obj) => obj.name),
      responseCount: body.payload.value.virtuals.responsesCreatedCount,
      mediumLink: body.payload.value.mediumUrl,
    };

    res.status(200).json({
      status: "success",
      data,
    });

    // STORE IN DB
    data.postId = req.params.id;
    PostDetail.create(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

exports.getResponses = async (req, res) => {
  // FIRST CHECK IN DB
  try {
    const responses = await Response.find({ postId: req.params.id });
    if (responses.length) {
      return res.status(200).json({
        status: "success",
        data: responses,
      });
    }
  } catch (err) {
    console.error(err);
  }

  // IF NOT IN DB THEN GET IT
  const url = `https://medium.com/_/api/posts/${req.params.id}/responses`;
  try {
    const response = await fetch(url);
    let text = await response.text();

    text = text.substring(16);
    const body = JSON.parse(text);

    const data = [];
    body.payload.value.forEach((elem) => {
      var creator = body.payload.references.User[elem.creatorId];
      data.push({
        title: elem.title,
        subtitle: elem.content.subtitle,
        author: creator.name,
        avatar: "https://miro.medium.com/fit/c/32/32/" + creator.imageId,
        postId: req.params.id,
      });
    });

    res.status(200).json({
      status: "success",
      data,
    });
    // STORE IN DB
    Response.create(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failed",
      err,
    });
  }
};

exports.searchHistory = async (req, res) => {
  const history = await Tag.find()
    .sort({ createdAt: -1 })
    .select("tag")
    .limit(10)
    .lean();
  return res.status(200).json({
    status: "success",
    data: history.map((el) => el.tag),
  });
};
