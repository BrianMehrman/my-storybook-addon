import React from 'react';
import addons from '@storybook/addons';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const NotesPanel = styled.div({
  margin: 10,
  width: '100%',
  overflow: 'auto',
});

export class Notes extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { text: '' };
    this.onAddNotes = this.onAddNotes.bind(this);
  }

  onAddNotes = text => {
    this.setState({ text });
  };

  componentDidMount() {
    const { channel, api } = this.props;
    // Listen to the notes and render it.
    channel.on('notes-addon/add_notes', this.onAddNotes);

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onAddNotes('');
    });
  }

  render() {
    const { text } = this.state;
    const { active } = this.props;
    const textAfterFormatted = text ? text.trim().replace(/\n/g, '<br />') : '';

    return active ? <NotesPanel dangerouslySetInnerHTML={{ __html: textAfterFormatted }} /> : null;
  }

  // This is some cleanup tasks when the Notes panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel, api } = this.props;
    channel.removeListener('notes-addon/add_notes', this.onAddNotes);
  }
}

Notes.propTypes = {
  active: PropTypes.bool.isRequired,
  channel: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    removeListener: PropTypes.func,
  }).isRequired,
  api: PropTypes.shape({
    onStory: PropTypes.func,
    getQueryParam: PropTypes.func,
    setQueryParams: PropTypes.func,
  }).isRequired,
};

// Register the addon with a unique name.
addons.register('notes-addon', api => {
  // Also need to set a unique name to the panel.
  const channel = addons.getChannel();

  addons.addPanel('notes-addon/panel', {
    title: 'Notes',
    render: ({ active }) => <Notes channel={channel} api={api} active={active} />,
  });
});
