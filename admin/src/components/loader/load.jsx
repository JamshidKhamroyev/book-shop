import {useSelector} from 'react-redux'

const Load = () => {
    const {loader} = useSelector(state => state.loader)
    return (
        <div>
          {loader && (
            <div className="fixed top-0 left-0 w-full z-[423] h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="spinner"></div>
            </div>
          )}
        </div>
      );
}

export default Load