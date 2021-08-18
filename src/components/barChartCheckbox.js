import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const BarChartCheckbox = ({ keys, colors, onChangeKeys }) => (
  <FormGroup row>
    {Object.keys(keys).map(key => (
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            checked={keys[key]}
            onChange={onChangeKeys}
            name={key}
            style={{
              color: colors[Object.keys(keys).indexOf(key)],
            }}
          />
        }
        label={key}
      />
    ))}
  </FormGroup>
);

export default BarChartCheckbox;