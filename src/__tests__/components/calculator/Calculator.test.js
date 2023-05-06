import renderer from 'react-test-renderer';
import Calculator from '../../../components/calculator/Calculator';

it('renders correctly', () => {
	const calculator = renderer
		.create(<Calculator/>)
		.toJSON();
	expect(calculator).toMatchSnapshot();
});