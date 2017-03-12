import React from 'react';
import {connect} from 'react-redux';
import {settingCurrentCompany} from '../action-creators/company';
import {Link} from 'react-router';

export class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    d3.selectAll('svg').remove();
  }

  render(){
    return (
      <div className="wrapper">
        {
          this.props.companies && this.props.companies.map(company => {
            var self = this;
            console.log(company);
            return (
              <div>
                <Link to={`/companies/${company._id}`}>{company._source.company}</Link>
              </div>
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
