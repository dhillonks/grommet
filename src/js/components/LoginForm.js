// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Form = require('./Form');
var FormField = require('./FormField');
var CheckBox = require('./CheckBox');
var IntlMixin = require('../mixins/GrommetIntlMixin');
var CLASS_ROOT = "login-form";

var LoginForm = React.createClass({

  mixins: [IntlMixin],

  propTypes: {
    logo: React.PropTypes.node,
    title: React.PropTypes.string,
    rememberMe: React.PropTypes.bool,
    forgotPassword: React.PropTypes.node,
    errors: React.PropTypes.arrayOf(React.PropTypes.string),
    onSubmit: React.PropTypes.func
  },

  _onSubmit: function (event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();
    if (this.props.onSubmit) {
      this.props.onSubmit({username: username, password: password});
    }
  },

  getDefaultProps: function () {
    return ({
      errors: []
    });
  },

  componentDidMount: function() {
    this.refs.username.getDOMNode().focus();
  },

  render: function() {
    var classes = [CLASS_ROOT];

    var errors = this.props.errors.map(function (error, index) {
      return (<div key={index} className={CLASS_ROOT + "__error"}>{this.getGrommetIntlMessage(error)}</div>);
    }.bind(this));

    var logo = null;
    if (this.props.logo) {
      logo = (
        <div className={CLASS_ROOT + "__logo"}>
          {this.props.logo}
        </div>
      );
    }

    var title = null;
    if (this.props.title) {
      title = (
        <h1 className={CLASS_ROOT + "__title"}>
          {this.props.title}
        </h1>
      );
    }

    var footer = null;
    if (this.props.rememberMe || this.props.forgotPassword) {
      var rememberMe = null;
      if (this.props.rememberMe) {
        rememberMe = (
          <CheckBox className={CLASS_ROOT + "__remember-me"}
            id="remember-me" label={this.getIntlMessage('LoginForm.rememberMe')} />
        );
      }
      footer = (
        <div className={CLASS_ROOT + "__footer"}>
          {rememberMe}
          {this.props.forgotPassword}
        </div>
      );
    }

    return (
      <Form className={classes.join(' ')} onSubmit={this._onSubmit}>
        {logo}
        {title}
        <fieldset>
          <FormField htmlFor="username" label={this.getIntlMessage('LoginForm.username')}>
            <input id="username" ref="username" type="email" />
          </FormField>
          <FormField htmlFor="password" label={this.getIntlMessage('LoginForm.password')}>
            <input id="password" ref="password" type="password" />
          </FormField>
        </fieldset>
        {errors}
        <input type="submit" className={CLASS_ROOT + "__submit primary call-to-action"} value={this.getIntlMessage('LoginForm.btn_label')} />
        {footer}
      </Form>
    );
  }

});

module.exports = LoginForm;
