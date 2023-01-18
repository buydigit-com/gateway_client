import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppContext from 'context/Context';
import GoogleMapReact from 'google-map-react';
import googleMapStyles from 'helpers/googleMapStyles';
import PropTypes from 'prop-types';
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import mapMarker from '../../../src/assets/img/icons/map-marker.png';

const InfoWindow = props => {
  const infoWindowStyle = {
    position: 'absolute',
    bottom: 50,
    padding: '10px',
    borderRadious: '20px',
    overflow: 'hidden',
    width: 250,
    backgroundColor: 'white',
    color: 'black',
    zIndex: 100,
    left: -125,
    height: 'auto'
  };
  return (
    <div className="border border-light rounded-3" style={infoWindowStyle}>
      <div className="position-relative">
        {props.children}
        <span
          className="position-absolute top-0 end-0 pt-1 pe-1 ps-2 pb-2 cursor-pointer"
          onClick={() => props.setShow(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </div>
    </div>
  );
};
const Marker = props => {
  const [show, setShow] = useState(false);
  return (
    <div className="position-relative">
      <img
        src={mapMarker}
        onClick={() => setShow(!show)}
        className="position-absolute top-0 m-auto bottom-0 translate-middle"
      />
      {props.children && show && (
        <InfoWindow setShow={setShow}>{props.children}</InfoWindow>
      )}
    </div>
  );
};

const GoogleMap = ({
  mapStyle,
  initialCenter,
  darkStyle,
  className,
  children,
  ...rest
}) => {
  const {
    config: { isDark }
  } = useContext(AppContext);

  const [mapStyles, setMapStyles] = useState(mapStyle);
  useEffect(() => {
    if (mapRef.current && darkStyle) {
      if (isDark) {
        setMapStyles(darkStyle);
      } else {
        setMapStyles(mapStyle);
      }
    }
  }, [isDark]);

  const createMapOptions = () => ({
    mapTypeControl: true,
    streetViewControl: true,
    // panControl: true,
    styles: googleMapStyles[mapStyles]
  });

  const mapRef = useRef(null);

  return (
    <div className={className} style={{ width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        zoom={18}
        center={initialCenter}
        options={createMapOptions}
        ref={mapRef}
        {...rest}
      >
        <Marker lat={initialCenter.lat} lng={initialCenter.lng}>
          {children && <Fragment>{children}</Fragment>}
        </Marker>
      </GoogleMapReact>
    </div>
  );
};
export default GoogleMap;

GoogleMap.propTypes = {
  mapStyle: PropTypes.oneOf([
    'Default',
    'Gray',
    'Midnight',
    'Hopper',
    'Beard',
    'AssassianCreed',
    'SubtleGray',
    'Tripitty',
    'Cobalt'
  ]),
  darkStyle: PropTypes.oneOf([
    'Default',
    'Gray',
    'Midnight',
    'Hopper',
    'Beard',
    'AssassianCreed',
    'SubtleGray',
    'Tripitty',
    'Cobalt'
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
  ...Map.propTypes
};

Marker.propTypes = {
  children: PropTypes.node
};
InfoWindow.propTypes = {
  children: PropTypes.node,
  setShow: PropTypes.func
};

GoogleMap.defaultProps = { zoom: 17, mapStyle: 'Default' };
