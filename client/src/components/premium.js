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
           <div><h1>Premium Films</h1>
           <br/>
           Use AD blocker
           </div>
            <button className='CM' onClick={this.handleClickCM}></button>
            <button className='WBZ' onClick={this.handleClickWBG}></button>
          </div>
        </div>
      );
    }
  }


export default Premium;