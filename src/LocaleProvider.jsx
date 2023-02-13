import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

export const LocaleContext = createContext();

export default class LocaleProvider extends Component {
  state = {
    locale: 'en-US',
    setLocale: locale => this.setState({ locale: locale ? 'en-US' : 'jp-JP' }),
  };

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <LocaleContext.Provider value={this.state}>
        {children}
      </LocaleContext.Provider>
    );
  }
}

export const LocaleConsumer = LocaleContext.Consumer;
