import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const BarChartCheckbox = ({ keys, colors, onChangeKeys }) => (
  <FormGroup row>
    {Object.keys(keys).map((key, index) => (
      <FormControlLabel
        key={key}
        control={
          <Checkbox
            checked={keys[key]}
            onChange={onChangeKeys}
            name={key}
            style={{
              color: colors[index],
            }}
          />
        }
        label={key}
      />
    ))}
  </FormGroup>
);

export default BarChartCheckbox;
