import React from 'react';
import {connect} from 'react-redux';
import singleCompany from '../components/singleCompany';
import {settingCurrentCompany} from '../action-creators/company';

export class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="wrapper">
        {
          this.props.companies && this.props.companies.map(company => {
            var self = this;
            return (
              <singleCompany key={company.id} company={company} handleSelect={
                function(){
                  self.props.selectingCompany(self.props.currentCompany, company)
                }
              }
              />
            )
          })
        }
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentCompany: state.company.currentCompany,
    companies: state.company.companies
  };
}

const mapDispatchToProps = dispatch => {
    return {
        selectingCompany: (currentCompany, newCompany) => (dispatch(settingCurrentCompany(currentCompany, newCompany)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
