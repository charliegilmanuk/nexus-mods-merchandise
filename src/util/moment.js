import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    future: '%s to go',
    past: '%s ago'
  }
});

export default moment;
