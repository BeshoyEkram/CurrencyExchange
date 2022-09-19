import Reactotron, { asyncStorage, overlay, trackGlobalErrors, openInEditor, networking, } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux'

const reactotron =
  Reactotron
    .configure()
    .useReactNative()
    .use(trackGlobalErrors({
      veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
    }))
    .use(overlay())
    .use(reactotronRedux())
    // .use(reactotronRedux({
    //   isActionImportant: action => action.type === 'repo.receive'
    // }))
    .use(openInEditor())
    .use(asyncStorage({}))
    .use(networking())
    .connect()

export default reactotron
