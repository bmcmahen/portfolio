import React from 'react'
import { LeftArrow as InvertedArrow } from './Dividers'
import { Navbar } from './Navbar'
import './InteractiveHeadline.css'
import blur from './Portfolio/blur.png'
import { CanvasController } from './Canvas/CanvasController'
import './Header.css'
import me from './me.jpg'
import { BackgroundVideo } from './BackgroundVideo'
import sky from './Canvas/videos/640707050.mp4'
import Media from 'react-media'

const frames = JSON.parse(
  `[{"pageX":0.42562724014336917,"pageY":0.3875,"delay":500},{"pageX":0.43548387096774194,"pageY":0.3775,"delay":18},{"pageX":0.4507168458781362,"pageY":0.36,"delay":19},{"pageX":0.47491039426523296,"pageY":0.3325,"delay":16},{"pageX":0.49551971326164873,"pageY":0.31,"delay":16},{"pageX":0.5152329749103942,"pageY":0.29,"delay":18},{"pageX":0.5259856630824373,"pageY":0.285,"delay":16},{"pageX":0.5367383512544803,"pageY":0.28,"delay":15},{"pageX":0.5439068100358423,"pageY":0.2775,"delay":17},{"pageX":0.5474910394265233,"pageY":0.2775,"delay":18},{"pageX":0.5483870967741935,"pageY":0.2775,"delay":15},{"pageX":0.5501792114695341,"pageY":0.2775,"delay":33},{"pageX":0.5501792114695341,"pageY":0.2825,"delay":18},{"pageX":0.5456989247311828,"pageY":0.295,"delay":18},{"pageX":0.532258064516129,"pageY":0.3225,"delay":17},{"pageX":0.5062724014336918,"pageY":0.3625,"delay":17},{"pageX":0.46863799283154123,"pageY":0.4175,"delay":15},{"pageX":0.4292114695340502,"pageY":0.4675,"delay":17},{"pageX":0.40591397849462363,"pageY":0.5025,"delay":17},{"pageX":0.3844086021505376,"pageY":0.5275,"delay":15},{"pageX":0.3790322580645161,"pageY":0.535,"delay":18},{"pageX":0.3772401433691756,"pageY":0.535,"delay":16},{"pageX":0.3772401433691756,"pageY":0.5375,"delay":15},{"pageX":0.3790322580645161,"pageY":0.5375,"delay":17},{"pageX":0.3888888888888889,"pageY":0.5375,"delay":22},{"pageX":0.4274193548387097,"pageY":0.5175,"delay":17},{"pageX":0.4650537634408602,"pageY":0.485,"delay":22},{"pageX":0.5134408602150538,"pageY":0.4425,"delay":14},{"pageX":0.5618279569892473,"pageY":0.4,"delay":18},{"pageX":0.5905017921146953,"pageY":0.3725,"delay":22},{"pageX":0.6200716845878136,"pageY":0.35,"delay":17},{"pageX":0.6281362007168458,"pageY":0.345,"delay":16},{"pageX":0.6308243727598566,"pageY":0.345,"delay":16},{"pageX":0.6209677419354839,"pageY":0.3625,"delay":19},{"pageX":0.5967741935483871,"pageY":0.4,"delay":22},{"pageX":0.5421146953405018,"pageY":0.4725,"delay":15},{"pageX":0.48566308243727596,"pageY":0.54,"delay":22},{"pageX":0.43637992831541217,"pageY":0.5925,"delay":14},{"pageX":0.3718637992831541,"pageY":0.6575,"delay":17},{"pageX":0.35125448028673834,"pageY":0.68,"delay":18},{"pageX":0.33512544802867383,"pageY":0.6975,"delay":19},{"pageX":0.3333333333333333,"pageY":0.7,"delay":18},{"pageX":0.3333333333333333,"pageY":0.7,"delay":19},{"pageX":0.3387096774193548,"pageY":0.7,"delay":20},{"pageX":0.3521505376344086,"pageY":0.7,"delay":18},{"pageX":0.3906810035842294,"pageY":0.6825,"delay":19},{"pageX":0.4444444444444444,"pageY":0.645,"delay":18},{"pageX":0.4883512544802867,"pageY":0.615,"delay":22},{"pageX":0.5277777777777778,"pageY":0.5825,"delay":18},{"pageX":0.5636200716845878,"pageY":0.555,"delay":19},{"pageX":0.5779569892473119,"pageY":0.545,"delay":19},{"pageX":0.5887096774193549,"pageY":0.535,"delay":17},{"pageX":0.5949820788530465,"pageY":0.535,"delay":21},{"pageX":0.5958781362007168,"pageY":0.535,"delay":19},{"pageX":0.5860215053763441,"pageY":0.555,"delay":19},{"pageX":0.5528673835125448,"pageY":0.6125,"delay":19},{"pageX":0.5125448028673835,"pageY":0.685,"delay":19},{"pageX":0.4543010752688172,"pageY":0.785,"delay":16},{"pageX":0.44175627240143367,"pageY":0.805,"delay":20},{"pageX":0.4265232974910394,"pageY":0.83,"delay":20},{"pageX":0.41935483870967744,"pageY":0.845,"delay":20},{"pageX":0.4283154121863799,"pageY":0.845,"delay":20},{"pageX":0.47580645161290325,"pageY":0.7875,"delay":21},{"pageX":0.5367383512544803,"pageY":0.7075,"delay":19},{"pageX":0.5967741935483871,"pageY":0.6325,"delay":22},{"pageX":0.6433691756272402,"pageY":0.5775,"delay":19},{"pageX":0.671146953405018,"pageY":0.5475,"delay":22},{"pageX":0.6845878136200717,"pageY":0.535,"delay":19},{"pageX":0.6899641577060932,"pageY":0.5325,"delay":19},{"pageX":0.6845878136200717,"pageY":0.5375,"delay":21},{"pageX":0.6397849462365591,"pageY":0.62,"delay":24},{"pageX":0.5824372759856631,"pageY":0.725,"delay":27},{"pageX":0.5510752688172043,"pageY":0.795,"delay":21},{"pageX":0.5304659498207885,"pageY":0.8425,"delay":23},{"pageX":0.5277777777777778,"pageY":0.8525,"delay":21},{"pageX":0.53584229390681,"pageY":0.8475,"delay":20},{"pageX":0.568100358422939,"pageY":0.7925,"delay":21},{"pageX":0.5878136200716846,"pageY":0.7575,"delay":22},{"pageX":0.6084229390681004,"pageY":0.725,"delay":20},{"pageX":0.6236559139784946,"pageY":0.7025,"delay":22},{"pageX":0.6290322580645161,"pageY":0.695,"delay":21},{"pageX":0.6326164874551972,"pageY":0.6925,"delay":23},{"pageX":0.6335125448028673,"pageY":0.6925,"delay":20},{"pageX":0.6335125448028673,"pageY":0.695,"delay":22},{"pageX":0.6254480286738351,"pageY":0.7225,"delay":42},{"pageX":0.6218637992831542,"pageY":0.74,"delay":20},{"pageX":0.6227598566308243,"pageY":0.75,"delay":20},{"pageX":0.6362007168458781,"pageY":0.75,"delay":22},{"pageX":0.671146953405018,"pageY":0.7025,"delay":23},{"pageX":0.6917562724014337,"pageY":0.675,"delay":20},{"pageX":0.7060931899641577,"pageY":0.66,"delay":25},{"pageX":0.7096774193548387,"pageY":0.655,"delay":20},{"pageX":0.7096774193548387,"pageY":0.6575,"delay":24},{"pageX":0.6998207885304659,"pageY":0.6875,"delay":21},{"pageX":0.6899641577060932,"pageY":0.715,"delay":22},{"pageX":0.6845878136200717,"pageY":0.73,"delay":21},{"pageX":0.6845878136200717,"pageY":0.7325,"delay":38},{"pageX":0.6890681003584229,"pageY":0.72,"delay":23},{"pageX":0.6935483870967742,"pageY":0.705}]`
)

const mobileFrames = JSON.parse(
  `[{"pageX":0.014423076923076924,"pageY":0.2425,"delay":1000},{"pageX":0.10336538461538461,"pageY":0.2075,"delay":17},{"pageX":0.17548076923076922,"pageY":0.1825,"delay":18},{"pageX":0.25961538461538464,"pageY":0.155,"delay":15},{"pageX":0.34375,"pageY":0.125,"delay":16},{"pageX":0.42788461538461536,"pageY":0.0925,"delay":18},{"pageX":0.5048076923076923,"pageY":0.065,"delay":17},{"pageX":0.5552884615384616,"pageY":0.0475,"delay":16},{"pageX":0.6105769230769231,"pageY":0.03,"delay":17},{"pageX":0.6370192307692307,"pageY":0.0225,"delay":17},{"pageX":0.6634615384615384,"pageY":0.0175,"delay":17},{"pageX":0.6923076923076923,"pageY":0.0175,"delay":16},{"pageX":0.7043269230769231,"pageY":0.0175,"delay":16},{"pageX":0.7331730769230769,"pageY":0.0175,"delay":18},{"pageX":0.7475961538461539,"pageY":0.0175,"delay":16},{"pageX":0.7716346153846154,"pageY":0.0175,"delay":16},{"pageX":0.7788461538461539,"pageY":0.02,"delay":18},{"pageX":0.7932692307692307,"pageY":0.0225,"delay":16},{"pageX":0.8221153846153846,"pageY":0.025,"delay":16},{"pageX":0.8389423076923077,"pageY":0.0275,"delay":18},{"pageX":0.8557692307692307,"pageY":0.0275,"delay":17},{"pageX":0.8629807692307693,"pageY":0.03,"delay":18},{"pageX":0.8677884615384616,"pageY":0.03,"delay":15},{"pageX":0.8677884615384616,"pageY":0.03,"delay":16},{"pageX":0.8677884615384616,"pageY":0.0325,"delay":17},{"pageX":0.8389423076923077,"pageY":0.0525,"delay":17},{"pageX":0.75,"pageY":0.11,"delay":16},{"pageX":0.6346153846153846,"pageY":0.18,"delay":17},{"pageX":0.47836538461538464,"pageY":0.28,"delay":18},{"pageX":0.23317307692307693,"pageY":0.4625,"delay":15},{"pageX":0.14423076923076922,"pageY":0.5375,"delay":18},{"pageX":0.05048076923076923,"pageY":0.62,"delay":15},{"pageX":0.004807692307692308,"pageY":0.6625,"delay":187},{"pageX":0.007211538461538462,"pageY":0.7,"delay":14},{"pageX":0.0625,"pageY":0.6775,"delay":16},{"pageX":0.14423076923076922,"pageY":0.645,"delay":17},{"pageX":0.28846153846153844,"pageY":0.5775,"delay":35},{"pageX":0.5625,"pageY":0.4375,"delay":17},{"pageX":0.6971153846153846,"pageY":0.3675,"delay":15},{"pageX":0.7548076923076923,"pageY":0.335,"delay":16},{"pageX":0.8028846153846154,"pageY":0.3125,"delay":17},{"pageX":0.8197115384615384,"pageY":0.3075,"delay":17},{"pageX":0.8245192307692307,"pageY":0.305,"delay":34},{"pageX":0.8293269230769231,"pageY":0.305,"delay":35},{"pageX":0.8293269230769231,"pageY":0.305,"delay":66},{"pageX":0.8293269230769231,"pageY":0.3075,"delay":15},{"pageX":0.8293269230769231,"pageY":0.3075,"delay":17},{"pageX":0.8293269230769231,"pageY":0.31,"delay":16},{"pageX":0.8197115384615384,"pageY":0.325,"delay":17},{"pageX":0.7932692307692307,"pageY":0.3525,"delay":33},{"pageX":0.6826923076923077,"pageY":0.455,"delay":19},{"pageX":0.5769230769230769,"pageY":0.54,"delay":15},{"pageX":0.5096153846153846,"pageY":0.6,"delay":17},{"pageX":0.43509615384615385,"pageY":0.665,"delay":15},{"pageX":0.39663461538461536,"pageY":0.7025,"delay":19},{"pageX":0.37740384615384615,"pageY":0.7225,"delay":15},{"pageX":0.3629807692307692,"pageY":0.7375,"delay":18},{"pageX":0.3557692307692308,"pageY":0.7475,"delay":18},{"pageX":0.35336538461538464,"pageY":0.75,"delay":16},{"pageX":0.35336538461538464,"pageY":0.7525,"delay":17},{"pageX":0.35336538461538464,"pageY":0.755,"delay":21},{"pageX":0.35336538461538464,"pageY":0.7575,"delay":17},{"pageX":0.35336538461538464,"pageY":0.76,"delay":16},{"pageX":0.35336538461538464,"pageY":0.7625,"delay":16},{"pageX":0.35336538461538464,"pageY":0.765,"delay":15},{"pageX":0.35336538461538464,"pageY":0.7675,"delay":46},{"pageX":0.3629807692307692,"pageY":0.7675,"delay":19},{"pageX":0.4254807692307692,"pageY":0.7475,"delay":18},{"pageX":0.49759615384615385,"pageY":0.72,"delay":16},{"pageX":0.5793269230769231,"pageY":0.6825,"delay":17},{"pageX":0.65625,"pageY":0.64,"delay":16},{"pageX":0.7067307692307693,"pageY":0.615,"delay":16},{"pageX":0.7692307692307693,"pageY":0.59,"delay":16},{"pageX":0.8149038461538461,"pageY":0.57,"delay":19},{"pageX":0.8317307692307693,"pageY":0.565,"delay":17},{"pageX":0.8533653846153846,"pageY":0.5575,"delay":16},{"pageX":0.8581730769230769,"pageY":0.5575,"delay":17},{"pageX":0.8605769230769231,"pageY":0.5575,"delay":16},{"pageX":0.8653846153846154,"pageY":0.5575,"delay":17},{"pageX":0.8653846153846154,"pageY":0.5575,"delay":17},{"pageX":0.8677884615384616,"pageY":0.5575,"delay":32},{"pageX":0.8677884615384616,"pageY":0.5575,"delay":18},{"pageX":0.8629807692307693,"pageY":0.57,"delay":18},{"pageX":0.8389423076923077,"pageY":0.5975,"delay":19},{"pageX":0.7692307692307693,"pageY":0.6775,"delay":17},{"pageX":0.7331730769230769,"pageY":0.71,"delay":18},{"pageX":0.7091346153846154,"pageY":0.735,"delay":20},{"pageX":0.6899038461538461,"pageY":0.755,"delay":26},{"pageX":0.6754807692307693,"pageY":0.7675,"delay":20},{"pageX":0.6754807692307693,"pageY":0.7725,"delay":17},{"pageX":0.6706730769230769,"pageY":0.7775,"delay":18},{"pageX":0.6706730769230769,"pageY":0.78,"delay":17},{"pageX":0.6706730769230769,"pageY":0.78,"delay":16},{"pageX":0.6706730769230769,"pageY":0.7825,"delay":67},{"pageX":0.6730769230769231,"pageY":0.7825,"delay":19},{"pageX":0.6730769230769231,"pageY":0.7825,"delay":16},{"pageX":0.6754807692307693,"pageY":0.7825,"delay":21},{"pageX":0.6778846153846154,"pageY":0.7825}]`
)

export class InteractiveHeader extends React.Component {
  render() {
    return (
      <section className="Header">
        <CanvasController
          disableOnTouch={this.props.disableAnimation}
          keyframes={this.props.disableAnimation ? [] : frames}
          mobileFrames={mobileFrames}
          delay={1000}
          color="rgb(239, 242, 245)"
          opacity={0.9}
          containerStyle={{ height: '400px' }}
        >
          <div
            className="Header__background"
            style={{
              backgroundImage: `url(${blur})`,
            }}
          />

          <BackgroundVideo
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
            src={sky}
          />

          <div className="Header__text">
            <div className="InteractiveHeadline--lead">
              <img alt="Ben's profile" src={me} />
              <div>Hello, my name is Ben.</div>
              <div>
                I'm a full-stack developer and love building interactive
                experiences for the web and mobile.
              </div>
            </div>
            <Navbar />
            <InvertedArrow
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                bottom: 0,
              }}
            />
          </div>
        </CanvasController>
      </section>
    )
  }
}
