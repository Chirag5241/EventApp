var express = require("express");
var path = require("path");
var logger = require("morgan");
var _ = require("lodash");
var bodyParser = require("body-parser");
var neo4j = require("neo4j-driver");
const { Result } = require("neo4j-driver-core");
var session = require("express-session"); // need to install

var app = express();
var PORT = process.env.PORT || 8080;

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var driver = neo4j.driver(
  process.env.HOST,
  neo4j.auth.basic(process.env.USER, process.env.PASSWORD)
);
var connection = driver.session();

app.use(
  session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/privacy_policy", function (req, res) {
  const fs = require("fs");
  try {
    const data = fs.readFileSync("message.txt", "utf8");
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.send(
      ```<!DOCTYPE html>
    <html>
    <head>
      <meta charset='utf-8'>
      <meta name='viewport' content='width=device-width'>
      <title>Privacy Policy</title>
      <style> body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding:1em; } </style>
    </head>
    <body>
    <strong>Privacy Policy</strong> <p>
                  Chirag built the Moment app as
                  a Free app. This SERVICE is provided by
                  Chirag at no cost and is intended for use as
                  is.
                </p> <p>
                  This page is used to inform visitors regarding my
                  policies with the collection, use, and disclosure of Personal
                  Information if anyone decided to use my Service.
                </p> <p>
                  If you choose to use my Service, then you agree to
                  the collection and use of information in relation to this
                  policy. The Personal Information that I collect is
                  used for providing and improving the Service. I will not use or share your information with
                  anyone except as described in this Privacy Policy.
                </p> <p>
                  The terms used in this Privacy Policy have the same meanings
                  as in our Terms and Conditions, which are accessible at
                  Moment unless otherwise defined in this Privacy Policy.
                </p> <p><strong>Information Collection and Use</strong></p> <p>
                  For a better experience, while using our Service, I
                  may require you to provide us with certain personally
                  identifiable information. The information that
                  I request will be retained on your device and is not collected by me in any way.
                </p> <!----> <p><strong>Log Data</strong></p> <p>
                  I want to inform you that whenever you
                  use my Service, in a case of an error in the app
                  I collect data and information (through third-party
                  products) on your phone called Log Data. This Log Data may
                  include information such as your device Internet Protocol
                  (“IP”) address, device name, operating system version, the
                  configuration of the app when utilizing my Service,
                  the time and date of your use of the Service, and other
                  statistics.
                </p> <p><strong>Cookies</strong></p> <p>
                  Cookies are files with a small amount of data that are
                  commonly used as anonymous unique identifiers. These are sent
                  to your browser from the websites that you visit and are
                  stored on your device's internal memory.
                </p> <p>
                  This Service does not use these “cookies” explicitly. However,
                  the app may use third-party code and libraries that use
                  “cookies” to collect information and improve their services.
                  You have the option to either accept or refuse these cookies
                  and know when a cookie is being sent to your device. If you
                  choose to refuse our cookies, you may not be able to use some
                  portions of this Service.
                </p> <p><strong>Service Providers</strong></p> <p>
                  I may employ third-party companies and
                  individuals due to the following reasons:
                </p> <ul><li>To facilitate our Service;</li> <li>To provide the Service on our behalf;</li> <li>To perform Service-related services; or</li> <li>To assist us in analyzing how our Service is used.</li></ul> <p>
                  I want to inform users of this Service
                  that these third parties have access to their Personal
                  Information. The reason is to perform the tasks assigned to
                  them on our behalf. However, they are obligated not to
                  disclose or use the information for any other purpose.
                </p> <p><strong>Security</strong></p> <p>
                  I value your trust in providing us your
                  Personal Information, thus we are striving to use commercially
                  acceptable means of protecting it. But remember that no method
                  of transmission over the internet, or method of electronic
                  storage is 100% secure and reliable, and I cannot
                  guarantee its absolute security.
                </p> <p><strong>Links to Other Sites</strong></p> <p>
                  This Service may contain links to other sites. If you click on
                  a third-party link, you will be directed to that site. Note
                  that these external sites are not operated by me.
                  Therefore, I strongly advise you to review the
                  Privacy Policy of these websites. I have
                  no control over and assume no responsibility for the content,
                  privacy policies, or practices of any third-party sites or
                  services.
                </p> <p><strong>Children’s Privacy</strong></p> <!----> <div><p>
                    I do not knowingly collect personally
                    identifiable information from children. I 
                    encourage all children to never submit any personally
                    identifiable information through 
                    the Application and/or Services.
                    I encourage parents and legal guardians to monitor 
                    their children's Internet usage and to help enforce this Policy by instructing 
                    their children never to provide personally identifiable information through the Application and/or Services without their permission. If you have reason to believe that a child 
                    has provided personally identifiable information to us through the Application and/or Services, 
                    please contact us. You must also be at least 16 years of age to consent to the processing 
                    of your personally identifiable information in your country (in some countries we may allow your parent 
                    or guardian to do so on your behalf).
                  </p></div> <p><strong>Changes to This Privacy Policy</strong></p> <p>
                  I may update our Privacy Policy from
                  time to time. Thus, you are advised to review this page
                  periodically for any changes. I will
                  notify you of any changes by posting the new Privacy Policy on
                  this page.
                </p> <p>This policy is effective as of 2022-08-17</p> <p><strong>Contact Us</strong></p> <p>
                  If you have any questions or suggestions about my
                  Privacy Policy, do not hesitate to contact me at momenteventsapp@gmail.com.
                </p> <p>This privacy policy page was created at <a href="https://privacypolicytemplate.net" target="_blank" rel="noopener noreferrer">privacypolicytemplate.net </a>and modified/generated by <a href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">App Privacy Policy Generator</a></p>
    </body>
    </html>
      ```
    );
  }
  console.error("printing privacy policy");
});

app.post("/user_login", jsonParser, (req, res) => {
  var userId = req.body.username;
  var pass = req.body.password;
  console.log("User login", userId);
  connection
    .run("MATCH (u:User {ID: $userId, password:$pass}) RETURN u", {
      userId: userId,
      pass: pass,
    })
    .then(function (result) {
      //console.log(result.records[0].get('u').properties.name)
      if (_.isEmpty(result.records)) {
        res.end();
        console.log("User Not found here");
        res.write("Please login first.");
        res.end();
        // throw {
        //   status: 400
        // }
      } else {
        //console.log(result.records)
        sess = req.session;

        // console.log(sess.email);

        if (req.session) {
          sess.email = result.records[0].get("u").properties.email;
          sess.name = result.records[0].get("u").properties.name;
          // sess.phone = result.records[0].get("u").properties.phone;
          sess.username = result.records[0].get("u").properties.username;
          // res.write(`<h1>Hello ${sess.email} h1><br>`);
          var user = {
            name: sess.name,
            username: sess.username,
            email: sess.email,
          };

          res.send(JSON.stringify(user));
          res.end();
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/create_user", jsonParser, (req, res) => {
  var name0 = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var pass = req.body.password;
  console.log("Create user", username);
  connection
    .run("MATCH (u:User {ID: $username}) RETURN u", {
      username: username,
    })
    .then(function (result) {
      if (!_.isEmpty(result.records)) {
        res.end();
      } else {
        connection
          .run(
            "Create (u:User {ID: $username, username: $username, email:$email, name:$name0, password:$pass}) Return u",
            {
              username: username,
              name0: name0,
              email: email,
              pass: pass,
            }
          )
          .then(function (result) {
            sess = req.session;
            // console.log(sess.email);

            if (req.session) {
              sess.email = email; //result.records[0].get("u").properties.email;
              sess.name = name0; //result.records[0].get("u").properties.name;
              sess.username = username; //result.records[0].get("u").properties.username;
              // res.write(`<h1>Hello ${sess.email} h1><br>`);
              var user = {
                name: sess.name,
                username: sess.username,
                email: sess.email,
              };
              res.send(JSON.stringify(user));
            }
            res.end();
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/log", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  var inp_type = req.body.user;
  console.log("POST req on", inp_type);
  connection
    .run(
      'match (n:Event)-[:tags]->(inte:Interest)  with n, collect(inte.name) as int_list Where n.startingTime contains "2022" return ID(n), (n), int_list order by n.startingTime desc limit 25',
      { name: inp_type }
    )
    .then(function (result) {
      var EventArr = [];
      result.records.forEach(function (record) {
        // console.log(record);
        EventArr.push({
          id: record._fields[0].low,
          title: record._fields[1].properties.Name,
          //type: record._fields[1].properties.type,
          startingTime: record._fields[1].properties.startingTime,
          image: record._fields[1].properties.Image,
          description: record._fields[1].properties.Description,
          location: record._fields[1].properties.Location,
          taglist: record._fields[2],
        });
        console.log(record._fields[0].low);
      });
      // console.log(JSON.stringify(EventArr));
      // res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(EventArr));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/feat", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.user;

  // if (req.session) {
  //   var inp_type = sess.username; // if session
  // } else {
  //   var inp_type = "user_1";
  // }

  var inp_type = "user_1";

  console.log("POST req on", inp_type);
  connection
    .run(
      `Match (m:Interest) 
      Optional match (m)-[c:user_interest]-(u:User {ID : $userid})
      with m, u,
      case
          when (m)-[c]-(u) then 1
          else 0
      end as s1
      with m, s1
      Optional match (m)-[t:tags]-(:Event)-[:attending]-(u:User{ID : $userid})
      with m, s1, count(t) as s2
      //Optional match (m)-[t:tags]-(:Event)-[:liked]-(u:User{ID : $userid})
      Optional match (u:User{ID : $userid})-[:liked]-(:Event)-[t:tags]-(m)
      with m, s1, s2, count(t) as s3
      Optional match (u:User{ID : $userid})-[:attending]-(:Event)-[:tags]-(:Interest)-[:tags]-(:Event)-[t:tags]-(m)
      with m, s1, s2, s3, count(t) as s4
      Optional match (u:User{ID : $userid})-[:liked]-(:Event)-[:tags]-(:Interest)-[:tags]-(:Event)-[t:tags]-(m)
      with m, s1, s2, s3, s4, count(t) as s5
      Optional match (u:User{ID : $userid})-[c:user_interest]-(:Interest)-[:tags]-(:Event)-[t:tags]-(m)
      with m, s1, s2, s3, s4, s5, count(t) as s6
      with m, [m.name, s1*10000+s2*1000+s3*500+s4/5+s5/6+s6/2] as s//, s1, s2, s3, s4, s5, s6
      order by s[1] desc
      with collect(m) as mm, apoc.map.fromPairs(collect(s)) as ss, [] as pk
      
      call{
          match(u:User{ID : $userid})
          optional match (u)-[:attending]-(e1:Event)
          with u, collect(e1) as e1
          //, collect(id(e1)) as e1id [id(e1), e1, ittlist]
          optional match (u)-[:liked]-(e2:Event)
          where not e2 in e1
          //with u, e1, e2, collect(itt.name) as ittlist
          with e1+collect(e2) as ee
          unwind ee as er
          with er
          order by er.startingTime desc
          optional match (er)-[:tags]-(itt:Interest)
          with er, collect(itt.name) as ittlist
          with er, ittlist,
          case 
            when (er)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (er)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (er)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
          return collect([id(er), er, ittlist, att, lik, shut]) as ee, collect(id(er)) as eeid
      }
      
      with ss, mm, ["Followed", ee] as loe, eeid + pk as pk
      
      call{
          with ss, pk
          match(e:Event)-[:tags]-(tt:Interest)
          where e.startingTime contains '2022' AND not id(e) in pk
          with e, apoc.map.get(ss, tt.name, 0) as intscore, tt
          with e, reduce (s=0, x in collect(intscore)| s + x) as try, collect(tt.name) as tt
          order by try desc
          with e.Name as nme, collect(e)[0] as e, collect(tt)[0] as tt
          return e, tt
          limit 20
      }
    
    // return e.Name, tt
        with mm, loe, e, tt, pk
        order by e.startingTime desc
        with mm, loe, e, tt, pk, 
        case 
            when (e)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (e)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (e)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
        with mm, loe, ["Featured", collect([id(e), e, tt, att, lik, shut])] as fte, collect(id(e)) + pk as pk
        with mm, pk, collect(fte) + collect(loe) as ret
        
      unwind mm as m
      optional match (m)-[:tags]-(e:Event)
      with ret, pk, m, collect(id(e)) as ridempty
      where not isEmpty(ridempty)
      with ret, pk, collect(m) as mm
    
      optional match (m:Interest {name: mm[0].name})-[:tags]-(e:Event)
      where e.startingTime contains '2022' AND not id(e) in pk
      with ret, pk, mm, e 
      order by e.startingTime desc
      limit 15
      optional match (e)-[:tags]-(tt:Interest)
      with ret, pk, mm, e, collect(tt.name) as ittlist,
      case 
            when (e)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (e)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (e)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
      with ret, mm, collect([id(e), e, ittlist, att, lik, shut]) as intr1, collect(id(e)) + pk as pk
      with pk, mm, ret + collect([mm[0].name, intr1]) as ret
    
      optional match (m:Interest {name: mm[1].name})-[:tags]-(e:Event)
      where e.startingTime contains '2022' AND not id(e) in pk
      with ret, pk, mm, e 
      order by e.startingTime desc
      limit 15
      optional match (e)-[:tags]-(tt:Interest)
      with ret, pk, mm, e, collect(tt.name) as ittlist,
      case 
            when (e)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (e)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (e)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
      with ret, mm, collect([id(e), e, ittlist, att, lik, shut]) as intr1, collect(id(e)) + pk as pk
      with pk, mm, ret + collect([mm[1].name, intr1]) as ret
    
      optional match (m:Interest {name: mm[2].name})-[:tags]-(e:Event)
      where e.startingTime contains '2022' AND not id(e) in pk
      with ret, pk, mm, e 
      order by e.startingTime desc
      limit 15
      optional match (e)-[:tags]-(tt:Interest)
      with ret, pk, mm, e, collect(tt.name) as ittlist,
      case 
            when (e)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (e)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (e)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
      with ret, mm, collect([id(e), e, ittlist, att, lik, shut]) as intr1, collect(id(e)) + pk as pk
      with pk, mm, ret + collect([mm[2].name, intr1]) as ret
    
      optional match (m:Interest {name: mm[3].name})-[:tags]-(e:Event)
      where e.startingTime contains '2022' AND not id(e) in pk
      with ret, pk, mm, e 
      order by e.startingTime desc
      limit 15
      optional match (e)-[:tags]-(tt:Interest)
      with ret, pk, mm, e, collect(tt.name) as ittlist,
      case 
            when (e)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (e)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (e)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
      with ret, mm, collect([id(e), e, ittlist, att, lik, shut]) as intr1, collect(id(e)) + pk as pk
      with pk, mm, ret + collect([mm[3].name, intr1]) as ret
    
      optional match (m:Interest {name: mm[4].name})-[:tags]-(e:Event)
      where e.startingTime contains '2022' AND not id(e) in pk
      with ret, pk, mm, e 
      order by e.startingTime desc
      limit 15
      optional match (e)-[:tags]-(tt:Interest)
      with ret, pk, mm, e, collect(tt.name) as ittlist,
      case 
            when (e)-[:attending]-(:User{ID : $userid}) then 1
            else 0
          end as att,
          case 
            when (e)-[:liked]-(:User{ID : $userid}) then 1
            else 0
          end as lik,
          case 
            when (e)-[:shoutout]-(:User{ID : $userid}) then 1
            else 0
          end as shut
      with ret, mm, collect([id(e), e, ittlist, att, lik, shut]) as intr1, collect(id(e)) + pk as pk
      with pk, mm, ret + collect([mm[4].name, intr1]) as ret
      unwind ret as ret2
      with ret2
      where not isempty(ret2[1]) and ret2[1][1] <> 'null'
      return ret2[0] as name, ret2[1] as events
    //return ret2[0] as name`,
      { userid: inp_type }
    )
    .then(function (result) {
      var FinalArr = [];
      result.records.forEach(function (record) {
        var EventArr = [];
        record._fields[1].forEach(function (event) {
          //console.log(event)
          //console.log(record);
          EventArr.push({
            //test: event[1].properties.Name
            id: event[0].low,
            uniqueID: event[1].properties.ID,
            title: event[1].properties.Name,
            userID: event[1].properties.CreatorID,
            //type: record._fields[1].properties.type,
            visibility: event[1].properties.Visibility,
            startingTime: event[1].properties.startingTime,
            image: event[1].properties.Image,
            description: event[1].properties.Description,
            location: event[1].properties.Location,
            taglist: event[2],
            joined: event[3].low,
            liked: event[4].low,
            shouted: event[5].low,
          });
          //console.log(record._fields[0].low);
        });
        FinalArr.push({
          header: record._fields[0],
          data: EventArr,
        });
      });
      //console.log(JSON.stringify(FinalArr));
      //res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(FinalArr));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/spotlight", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  var inp_type = "user_1"; //req.body.user;
  console.log("POST req on", inp_type);
  connection
    .run(
      'match (n:User)-[:liked]->(e:Event), (e)-[:tags]->(inte:Interest) with e, collect(inte.name) as int_list Where e.startingTime contains "2022" return ID(e),e,int_list limit 5',
      { name: inp_type }
    )
    .then(function (result) {
      var EventArr = [];
      result.records.forEach(function (record) {
        // console.log(record);
        EventArr.push({
          id: record._fields[0].low,
          uniqueID: record._fields[1].properties.ID,
          title: record._fields[1].properties.Name,
          userID: record._fields[1].properties.CreatorID,
          //type: record._fields[1].properties.type,
          startingTime: record._fields[1].properties.startingTime,
          visibility: record._fields[1].properties.Visibility,
          image: record._fields[1].properties.Image,
          description: record._fields[1].properties.Description,
          location: record._fields[1].properties.Location,
          taglist: record._fields[2],
          // joined: event[3].low,
          // liked: event[4].low,
          // shouted: event[5].low,

          // id: record._fields[0].low,
          // title: record._fields[1].properties.Name,
          // //type: record._fields[1].properties.type,
          // startingTime: record._fields[1].properties.startingTime,
          // image: record._fields[1].properties.Image,
          // description: record._fields[1].properties.Description,
          // location: record._fields[1].properties.Location,
          // taglist: record._fields[2],
        });
        console.log(record._fields[0].low);
      });
      // console.log(JSON.stringify(EventArr));
      // res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(EventArr));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/data", function (req, res) {
  connection
    .run(
      "match (n:Event) where n.type contains $name return ID(n),(n) limit 25",
      { name: "Instagram" }
    )
    .then(function (result) {
      var EventArr = [];
      result.records.forEach(function (record) {
        console.log(record);
        EventArr.push({
          id: record._fields[0].low,
          key: record._fields[1].properties.ID,
          title: record._fields[1].properties.title,
          type: record._fields[1].properties.type,
          startingTime: record._fields[1].properties.startingTime,
          image: record._fields[1].properties.image,
          description: record._fields[1].properties.description,
        });
        console.log(record._fields[0].low);
      });
      res.setHeader("Content-Type", "text/html");
      res.send(JSON.stringify(EventArr));
      res.end();
      // res.render('index', {
      //   movies: MovieArr
      // });
    })
    .catch(function (err) {
      console.log(err);
    });
  // console.log(result);
  // res.send(result);
});

app.get("/search", function (req, res) {
  connection
    .run(
      'match (n:Event)-[:tags]->(inte:Interest)  with n, collect(inte.name) as int_list Where n.startingTime contains "2022" return ID(n), (n), int_list order by n.startingTime desc limit 1000'
    )
    .then(function (result) {
      var EventArr = [];
      result.records.forEach(function (record) {
        console.log(record);
        EventArr.push({
          // id: record._fields[0].low,
          // title: record._fields[1].properties.Name,
          // //type: record._fields[1].properties.type,
          // startingTime: record._fields[1].properties.startingTime,
          // visibility: record._fields[1].properties.visibility,
          // location: record._fields[1].properties.Location,
          // image: record._fields[1].properties.Image,
          // description: record._fields[1].properties.Description,
          // taglist: record._fields[2],

          id: record._fields[0].low,
          uniqueID: record._fields[1].properties.ID,
          title: record._fields[1].properties.Name,
          userID: record._fields[1].properties.CreatorID,
          //type: record._fields[1].properties.type,
          startingTime: record._fields[1].properties.startingTime,
          visibility: record._fields[1].properties.Visibility,
          image: record._fields[1].properties.Image,
          description: record._fields[1].properties.Description,
          location: record._fields[1].properties.Location,
          taglist: record._fields[2],

          // description: record._fields[1].properties.description,
        });
        console.log(record._fields[0].low);
      });
      res.setHeader("Content-Type", "text/html");
      res.send(JSON.stringify(EventArr));
      res.end();
      // res.render('index', {
      //   movies: MovieArr
      // });
    })
    .catch(function (err) {
      console.log(err);
    });
  // console.log(result);
  // res.send(result);
});

app.get("/interests", function (req, res) {
  connection
    .run(
      "match (n:Interest) return distinct(n.category) as group, collect(n.name) as ls"
    )
    .then(function (result) {
      var InterestArr = [];
      result.records.forEach(function (record) {
        console.log(record);
        InterestArr.push({
          title: record._fields[0],
          data: record._fields[1],
        });
        console.log(record._fields[0].low);
        console.log(record._fields[2]);
      });
      res.setHeader("Content-Type", "text/html");
      res.send(JSON.stringify(InterestArr));
      res.end();
      // res.render('index', {
      //   movies: MovieArr
      // });
    })
    .catch(function (err) {
      console.log(err);
    });
  // console.log(result);
  // res.send(result);
});

app.post("/import_interest_list", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id})-[:user_interest]->(i: Interest) return  collect(i.name) as Interest_list",
      { id: inp_type }
    )
    .then(function (result) {
      var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/organization_details", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  var inp_type = req.body.id;
  console.log("Org Events POST req on", inp_type);
  connection
    .run(
      `match (org:Organization)
        where org.ID contains $id
        return ID(org), org`,
      { id: inp_type }
    )
    .then(function (result) {
      var EventArr = {
        id: result.records[0]._fields[0].low,
        name: result.records[0]._fields[1].properties.Name,
        image: result.records[0]._fields[1].properties.Image,
        // description: record._fields[1].properties.description,
      };
      console.log(EventArr);
      // res.setHeader('Content-Type', 'text/html');
      res.send(JSON.stringify(EventArr));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/organization_events", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  var inp_type = req.body.id;
  console.log("Org Events POST req on", inp_type);
  connection
    .run(
      `match (org:Organization)-[:Created]->(n:Event), (n)-[:tags]->(inte:Interest)
        with org, n, collect(inte.name) as int_list
        where org.ID contains $id
        return ID(n),n, int_list
        order by n.startingTime desc
        limit 50`,
      { id: inp_type }
    )
    .then(function (result) {
      var EventArr = [];
      result.records.forEach(function (record) {
        console.log(record);
        EventArr.push({
          id: record._fields[0].low,
          title: record._fields[1].properties.Name,
          //type: record._fields[1].properties.type,
          startingTime: record._fields[1].properties.startingTime,
          userID: record._fields[1].properties.CreatorID,
          visibility: record._fields[1].properties.Visibility,
          location: record._fields[1].properties.Location,
          image: record._fields[1].properties.Image,
          description: record._fields[1].properties.Description,
          taglist: record._fields[2],
          // description: record._fields[1].properties.description,
        });
      });
      console.log(EventArr);
      // res.setHeader('Content-Type', 'text/html');
      res.send(JSON.stringify(EventArr));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/delete_user_interest", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Delete int list for user ", inp_type);
  // console.log("POST req on", inp_type);
  connection
    .run("match (u:User)-[t:user_interest]-(i) where u.ID = $id delete t", {
      id: inp_type,
    })
    .then(function (result) {
      res.setHeader("Content-Type", "text/html");
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/export_user_interest", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Export int list for user ", inp_type);
  var outTags = req.body.interest_list;
  console.log(outTags);
  console.log("POST req on", inp_type);
  connection
    .run(
      "match (u:User), (i:Interest) where u.ID = $id and i.name in $interest_list create (u)-[r:user_interest]->(i)",
      { id: inp_type, interest_list: outTags }
    )
    .then(function (result) {
      res.setHeader("Content-Type", "text/html");
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/get_shoutOut", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Create shoutout for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id})-[s:shoutout]->(e: Event) return n, collect (e.ID) as event_IDs",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      if (_.isEmpty(result.records)) {
        res.end();
        console.log("does not exist");
        // res.setHeader("Content-Type", "text/html");
        res.send(JSON.stringify({ value: false }));
        // res.end();
      } else {
        res.end();
        // res.setHeader("Content-Type", "text/html");
        res.send(JSON.stringify({ value: true }));
        // res.end();
      }
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/create_shoutOut", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Create shoutout for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id}), (e: Event {ID :$eventID}) where e.ID = $eventID create (n)-[:shoutout]->(e)",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      // var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      // console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      // res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/delete_shoutOut", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Delete shoutout for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id})-[s:shoutout]->(e: Event {ID :$eventID}) delete s",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      // var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      // console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      // res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

///  ###### liked functions

app.post("/create_liked", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Create liked for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id}), (e: Event {ID :$eventID}) where e.ID = $eventID create (n)-[:liked]->(e)",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      // var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      // console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      // res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/delete_liked", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Delete liked for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id})-[s:liked]->(e: Event {ID :$eventID}) delete s",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      // var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      // console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      // res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

/// #### join functionality

app.post("/create_attending", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Create attending for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id}), (e: Event {ID :$eventID}) where e.ID = $eventID create (n)-[:attending]->(e)",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      // var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      // console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      // res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/delete_attending", jsonParser, (req, res) => {
  // res.send("POST Request Called")
  // var inp_type = req.body.id;
  var eventID = req.body.uniqueID;
  if (req.session) {
    var inp_type = sess.username; // if session
  } else {
    var inp_type = "user_1";
  }
  console.log("Delete attending for user and id: ", inp_type, " ", eventID);
  // console.log("Check int list for user ", inp_type);
  connection
    .run(
      "match (n:User {ID: $id})-[s:attending]->(e: Event {ID :$eventID}) delete s",
      { id: inp_type, eventID: eventID }
    )
    .then(function (result) {
      // var user_int_array = result.records[0]._fields[0];
      // result.records.forEach(function(record){

      //   user_int_array.push({
      //     Interest_list: record._fields[0]
      //   });
      // });
      // console.log(user_int_array);
      res.setHeader("Content-Type", "text/html");
      // res.send(JSON.stringify(user_int_array));
      res.end();
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.listen(PORT);
console.log("Server listening on PORT", PORT);

module.exports = app;
