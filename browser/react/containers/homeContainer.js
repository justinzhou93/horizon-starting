import React from 'react';
import {connect} from 'react-redux';
import singleCompany from '../components/singleCompany';
import {selectCompany} from '../action-creators/company';

export class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="wrapper">
        {
          this.props.companies && this.props.companies.map(company =>
            <singleCompany key={company.id} company={company} handleSelect={
                function(){
                  this.props.selectingCompany(this.props.currentCompany, company)
                }
              }
            />
          )
        }
      </div>
    );
  }

}

const mapStateToProps = state => ({currentCompany: state.currentCompany});

const mapDispatchToProps = dispatch => {
    return {
        selectingCompany: (currentCompany, newCompany) => (dispatch(selectCompany(currentCompany, newCompany)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
