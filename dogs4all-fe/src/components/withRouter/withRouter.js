import { useNavigation } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useHistory();
    
    return (
      <Component
        history={history}
        {...props}
        />
    );
  };
  
  return Wrapper;
};
export default withRouter;