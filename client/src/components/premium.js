const React = require('react');

class Premium extends React.Component {
    handleClickCM = () => {
      window.open('https://matriculant401merited.com/e/e28cv9hjc00u', '_blank');
    };
    handleClickWBG=()=>{
        window.open("https://upstream.to/embed-d6olq0xxn38c.html","_blank")
    }
  
    render() {
      return (
        <div>
            TESTED
          <div className="films">
            <img src="../src/components/IMG/Comic.jpg"></img>
            <button onClick={this.handleClickCM}>Capitan Marvel</button>
            <button onClick={this.handleClickWBG}>Wojna Bez Granic</button>
          </div>
        </div>
      );
    }
  }


export default Premium;