import PostList from '../components/postlist.jsx';
import { useDeps, composeWithTracker, composeAll } from 'mantra-core';

export const composer = ({ context }, onData) => {
  const { Meteor, Collections } = context();
  if (Meteor.subscribe('posts.list').ready()) {
    const posts = Collections.Posts.find().fetch();
    onData(null, { posts });
  }
};

export const depsMapper = (context, actions) => ({
  goToPost: actions.posts.goToPost,
  clearErrors: actions.posts.clearErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(PostList);
