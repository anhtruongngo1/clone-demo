import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage} from "react-intl" ;

class About extends Component {
  render() {
    

    return (
        <div className="section-about"> 
                    <div className="section-about-header">
                        Truyền thông nói gì về bi-shop
                    </div>
                    <div className="section-about-content">
                    <div className="content-left">
                    <iframe width="50%" height="50%" src="https://www.youtube.com/embed/3tx0iqJ-UR0" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                    </div>
                    <div className="content-right">
                            <div>
                                <p>nhạc chill tiktok, nhac chill tik tok, chill tik tok, lofi chill, chill, chill tiktok, tik tok chill, nhac chill tiktok, nhạc chill, nhac chill, nhạc tik tok chill, lofi gây nghiện, lofi gay nghien, nhạc lofi chil</p>
                            </div>
                    </div>

                    </div>
        </div>
    )
}
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language : state.app.language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
