import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

export const LocaleContext = createContext();

export default class LocaleProvider extends Component {
  state = {
    temp: 'C',
  };

  static propTypes = {
    children: PropTypes.node,
  };

  handleSwitchLocale = () => {
    this.setState(({ locale }) => ({
      locale: locale === 'C' ? 'F' : 'C',
    }));
  };
  render() {
    const { children } = this.props;

    return <div>{children}</div>;
  }
}

export const LocaleConsumer = LocaleContext.Consumer;
