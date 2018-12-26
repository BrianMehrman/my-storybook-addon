import addons, { makeDecorator } from '@storybook/addons';

const withNotes = makeDecorator({
  name: 'withNotes',
  parameterName: 'notes',
  // This means don't run this decorator if the notes decorator is not set
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, {parameters}) => {
    const channel = addons.getChannel();

    // Our simple API above simply sets the notes parameter to a string,
    // which we send to the channel
    channel.emit('notes-addon/add_notes', parameters);

    return getStory(context);
  }
})

export default withNotes;
