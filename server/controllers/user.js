const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.userCreate = async function userCreate(ctx) {
  await User.create(ctx.request.body)
    .then(() => {
      ctx.status = 201;
      ctx.response.body = {
        message: 'Accaunt has been created',
      };
    })
    .catch(() => {
      ctx.status = 400;
      ctx.response.body = {
        message: 'Invalid user params',
        code: 'invalid_user_params',
      };
    });
};

module.exports.getUsers = async function getUsers(ctx) {
  await User
    .find(
      {},
      'avatar nickname experience',
      {
        sort: { experience: -1 },
        skip: Number(ctx.query.skip),
        limit: Number(ctx.query.limit),
      },
    )
    .then((users) => {
      ctx.response.body = users;
    })
    .catch(() => {
      ctx.status = 404;
      ctx.response.body = {
        message: 'Users with id not found',
        code: 'not_found',
      };
    });
};

module.exports.getUser = async function getUser(ctx) {
  await User
    .findById(
      ctx.params.id,
      'avatar nickname experience',
    )
    .then((users) => {
      ctx.response.body = users;
    })
    .catch(() => {
      ctx.status = 404;
      ctx.response.body = {
        message: 'User with id not found',
        code: 'not_found',
      };
    });
};

// module.exports.userCreate = async function userCreate(ctx) {
//   const newUser = User.create(ctx.request.body);

//   try {
//     await newUser.save();
//   } catch (error) {
//     sendJSONResponse(ctx, 400, {
//       message: 'Invalid user params',
//       code: 'invalid_user_params',
//     });
//   }

//   sendJSONResponse(ctx, 201, {
//     message: 'Accaunt has been created',
//   });
// };


//   email: data.email,
//   nickname: data.nickname,
//   password: data.password,
//   // avatar: 'null',
//   // karma: 1,
//   // experience: 0,
//   // limitSlots: 8,
//   // openSlots: 3,
//   // skillSet: [1, 1, 2],
//   // skillsUnlocked: [1, 2],
// });

// const aaa = {
//   avatar: 'null',
//   karma: 1,
//   experience: 0,
//   limitSlots: 8,
//   nickname: 'null',
//   openSlots: 3,
//   skillSet: [1, 1, 2],
//   skillsUnlocked: [1, 2],
//   email: 'null',
// };

// User.create(aaa, (err) => {
//   if (err) console.log(err);
// });


// const sendJSONResponse = function (res, status, content) {
//   res.status(status);
//   res.json(content);
// };

// module.exports.locationsListByDistance = function (req, res) {
//   const lng = parseFloat(req.query.lng);
//   const lat = parseFloat(req.query.lat);
//   const geoOptions = {
//     spherical: true,
//     num: 10,
//     maxDistance: 20000,
//   };
//   const point = {
//     type: 'Point',
//     coordinates: [lng, lat],
//   };
//   if (!lng || !lat) {
//     sendJSONResponse(res, 404, {
//       message: 'lng and lat query parameters are required',
//     });
//     return;
//   }
//   Loc.geoNear(point, geoOptions, (err, results, stats) => {
//     const locations = [];
//     if (err) {
//       sendJSONResponse(res, 404, err);
//     } else {
//       results.forEach((doc) => {
//         locations.push({
//           distance: doc.dis,
//           name: doc.obj.name,
//           address: doc.obj.address,
//           rating: doc.obj.rating,
//           facilities: doc.obj.facilities,
//           _id: doc.obj._id,
//         });
//       });
//       sendJSONResponse(res, 200, locations);
//     }
//   });
// };

// module.exports.locationsCreate = function (req, res) {
//   Loc.create({
//     name: req.body.name,
//     address: req.body.address,
//     facilities: req.body.facilities.split(','),
//     coords: [parseFloat(req.body.lng),
//       parseFloat(req.body.lat)],
//     openingTimes: [{
//       days: req.body.days1,
//       opening: req.body.opening1,
//       closing: req.body.closing1,
//       closed: req.body.closed1,
//     }, {
//       days: req.body.days2,
//       opening: req.body.opening2,
//       closing: req.body.closing2,
//       closed: req.body.closed2,
//     }],
//   }, (err, location) => {
//     if (err) {
//       sendJSONResponse(res, 400, err);
//     } else {
//       sendJSONResponse(res, 201, location);
//     }
//   });
// };

// module.exports.locationsReadOne = function (req, res) {
//   if (req.params && req.params.locationid) {
//     Loc
//       .findById(req.params.locationid)
//       .exec((err, location) => {
//         if (!location) {
//           sendJSONResponse(res, 404, {
//             message: 'location not found',
//           });
//           return;
//         } else if (err) {
//           sendJSONResponse(res, 404, err);
//           return;
//         }

//         sendJSONResponse(res, 200, location);
//       });
//   } else {
//     sendJSONResponse(res, 404, {
//       message: 'No locationid in request',
//     });
//   }
// };

// module.exports.locationsUpdateOne = function (req, res) {
//   if (!req.params.locationid) {
//     sendJSONResponse(res, 404, {
//       message: 'locationid not found',
//     });
//     return;
//   }
//   Loc
//     .findById(req.params.locationid)
//     .select('-reviews - rating')
//     .exec((err, location) => {
//       if (!location) {
//         sendJSONResponse(res, 404, {
//           message: 'location not found',
//         });
//         return;
//       } else if (err) {
//         sendJSONResponse(res, 400, err);
//         return;
//       }
//       location.name = req.body.name;
//       location.address = req.body.address;
//       location.facilities = req.body.facilities.split(',');
//       location.coords = [parseFloat(req.body.lng),
//         parseFloat(req.body.lat)];
//       location.openingTimes = [{
//         days: req.body.days1,
//         opening: req.body.opening1,
//         closing: req.body.closing1,
//         closed: req.body.closed1,
//       }, {
//         days: req.body.days2,
//         opening: req.body.opening2,
//         closing: req.body.closing2,
//         closed: req.body.closed2,
//       }];
//       location.save((err, location) => {
//         if (err) {
//           sendJSONResponse(res, 404, err);
//         } else {
//           sendJSONResponse(res, 200, location);
//         }
//       });
//     });
// };

// module.exports.locationsDeleteOne = function (req, res) {
//   const locationid = req.params.locationid;
//   if (locationid) {
//     Loc
//       .findByIdAndRemove(locationid)
//       .exec((err, location) => {
//         if (err) {
//           sendJSONResponse(res, 404, err);
//           return;
//         }
//         sendJSONResponse(res, 204, null);
//       });
//   } else {
//     sendJSONResponse(res, 404, {
//       message: 'No locationid',
//     });
//   }
// };
