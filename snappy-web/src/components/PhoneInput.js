import React from 'react';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
});

function PhoneMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

PhoneMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

class PhoneInput extends React.Component {
  render() {
    const { id, label, value, onChange, className, classes, ...other } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <Input
          {...other}
          id={id}
          value={value}
          onChange={onChange}
          inputComponent={PhoneMaskCustom}
        />
      </FormControl>
    );
  }
}

PhoneInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhoneInput);
