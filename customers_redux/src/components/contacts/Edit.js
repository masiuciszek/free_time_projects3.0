/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form } from '../../styles/styled-comp/Form';
import { updateContact, getContact } from '../../actions/customerActions';
import InputGroup from '../layout/InputGroup';
import { FormBtn } from '../../styles/styled-comp/Button';

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      phone: '',
      username: '',
      website: '',
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    const { name, email, phone, username, website } = nextProps.contact;
    this.setState({
      name,
      email,
      phone,
      username,
      website,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getContact(id);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, phone, username, website } = this.state;
    if (name === '') {
      this.setState({ errors: { name: 'Name is Required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is Required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is Required' } });
      return;
    }
    if (username === '') {
      this.setState({ errors: { username: 'Username is Required' } });
      return;
    }
    if (website === '') {
      this.setState({ errors: { website: 'Website is Required' } });
      return;
    }

    const { id } = this.props.match.params;
    const uptdContact = {
      id,
      name,
      email,
      phone,
      username,
      website,
    };

    this.props.updateContact(uptdContact);
    // clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      username: '',
      website: '',
    });

    this.props.history.push('/');
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { name, email, phone, username, website, errors } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup
          type="text"
          placeholder="enter your name"
          label="Name"
          name="name"
          value={name}
          handleChange={this.handleChange}
          error={errors.name}
        />
        <InputGroup
          type="email"
          placeholder="enter your email"
          label="Email"
          name="email"
          value={email}
          handleChange={this.handleChange}
          error={errors.email}
        />
        <InputGroup
          type="text"
          placeholder="enter your phone number"
          label="Phone"
          name="phone"
          value={phone}
          handleChange={this.handleChange}
          error={errors.phone}
        />
        <InputGroup
          type="text"
          placeholder="enter your username"
          label="Username"
          name="username"
          value={username}
          handleChange={this.handleChange}
          error={errors.username}
        />
        <InputGroup
          type="text"
          placeholder="enter your website"
          label="Website"
          name="website"
          value={website}
          handleChange={this.handleChange}
          error={errors.website}
        />
        <FormBtn type="submit">submit</FormBtn>
      </Form>
    );
  }
}

Edit.propTypes = {
  contact: PropTypes.object.isRequired,
  getContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ contact: state.contact.contact });

export default connect(
  mapStateToProps,
  { getContact, updateContact }
)(Edit);
