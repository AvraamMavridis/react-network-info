import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * High Order Component
 * that provides info about the connection type/speed
 * to the wrapped components.
 * You can use it to hide/show a section of a page based
 * on users internet type/speed.
 * <br/><br/>
 * [![Build Status](https://travis-ci.org/AvraamMavridis/react-network-info.svg?branch=master)](https://travis-ci.org/AvraamMavridis/react-network-info) [![Greenkeeper badge](https://badges.greenkeeper.io/AvraamMavridis/react-network-info.svg)](https://greenkeeper.io/) <br/> <a href="https://nodei.co/npm/react-network-info/"><img src="https://nodei.co/npm/react-network-info.png?mini=true"></a><br/><br/>
 *
 *
 *  The following properties are passed to the wrapped components
 *  - <strong>downlink</strong> : The effective bandwidth estimate in megabits per secondrounded to the nearest multiple of 25 kilobits per seconds.
 *  - <strong>effectiveType</strong> : The effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'. This value is determined using a combination of recently observed, round-trip time and downlink values.
 *  - <strong>rtt</strong> : The estimated effective round-trip time of the current connection, rounded to the nearest multiple of 25 milliseconds.
 *
 * @class NetworkInformation
 * @extends {Component}
 */
export default class NetworkInformation extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ])
  };

  state = {
    downlink: Infinity,
    effectiveType: undefined,
    rtt: Infinity
  };

  /**
   * Update the connection info
   */
  updateConnectionStatus() {
    this.setState({
      /**
       * Returns the effective bandwidth estimate in megabits per second,
       * rounded to the nearest multiple of 25 kilobits per seconds.
      */
      downlink: this.connection.downlink,
      /**
       * Returns the effective type of the connection
       * meaning one of 'slow-2g', '2g', '3g', or '4g'.
       * This value is determined using a combination of
       * recently observed, round-trip time and downlink values.
      */
      effectiveType: this.connection.effectiveType,
      /**
       * Returns the estimated effective round-trip
       * time of the current connection, rounded to
       * the nearest multiple of 25 milliseconds.
      */
      rtt: this.connection.rtt
    });
  }

  /**
   * Attach listener for the connection
   */
  componentDidMount() {
    this.connection = window.navigator.connection
      || window.navigator.mozConnection
      || window.navigator.webkitConnection;

    if (this.connection) {
      this.updateConnectionStatus();
      this.connection.addEventListener('typechange', this.updateConnectionStatus);
    }
  }

  /**
   * Remove listener
   */
  componentWillUnmount() {
    if (this.connection) {
      this.connection.removeEventListener('typechange', this.updateConnectionStatus);
    }
  }

  /**
   * Render component
   *
   * @returns {JSX.Element}
   */
  render() {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children(this.state);
    }

    return React.Children.map(children, child => React.cloneElement(child, this.state));
  }
}
