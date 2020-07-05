const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../models/movie');
const Director = require('../models/director')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
      }  = graphql;

// var directors =[
//   {name: 'Tarantino', age: 50, id: '1', movieId: '1'},
//   {name: 'Tarantino2', age: 55, id: '2', movieId: '2'}
// ];
// var movies =[
//   {name: 'Silence of lambs', genre: 'horror', id: '1', directorId: '1'},
//   {name: 'inception', genre: 'Sci-fi', id: '2', directorId:'2'},
//   {name: 'Silence of lambs2', genre: 'horror', id: '3', directorId: '1'},
//   {name: 'inception2', genre: 'Sci-fi', id: '4', directorId:'2'}
// ];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: ()=>({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    director: {
      type:DirectorType,
      resolve(parent, args){
        //return _.find(directors, {id: parent.directorId});
        return Director.findById(parent.directorId);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: ()=>({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    movie: {
      type: new GraphQLList(MovieType),
      resolve(parent, args){
        //return _.filter(movies,{directorId: parent.id});
        return Movie.find({directorId: parent.id});
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:()=>({
    addDirector: {
      type: DirectorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let director = new Director({
          name: args.name,
          age:  args.age
        });
        return director.save();
      }
    },
    addMovie: {
      type: MovieType,
      args:{
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        directorId: {type:new GraphQLNonNull(GraphQLString)}
      },

      resolve(parent, args){
        let movie = new Movie({
          name: args.name,
          genre:args.genre,
          directorId: args.directorId
        })
        return movie.save();
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    'movie': {
       type: MovieType,
       args:{id: {type:GraphQLID}},
       resolve(parent, args){
         //return _.find(movies, {id: args.id});
         //code to get data from db
         return Movie.findById(args.id);
       }
    },
    'director': {
      type: DirectorType,
      args: {id: {type:GraphQLID}},
      resolve(parent, args){
        //return _.find(directors, {id: args.id});
        return Director.findById(args.id);
      }
    },
    'movies':{
      type: new GraphQLList(MovieType),
      resolve(parent, args){
        //return movies;
        return Movie.find({});
      }
    },
    'directors': {
      type: new GraphQLList(DirectorType),
      resolve(parent, args){
        //return directors;
        return Director.find({});
      }
    }

  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
