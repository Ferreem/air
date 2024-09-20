import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import DrawLineButton from './components/DrawLineButton';
import LayerIcon from './assets/LayerIcon.png';
import LayersButton from './components/LayersButton';
import MinusIcon from './assets/minus.png';
import PlusIcon from './assets/plus.png';
import DrawLineIcon from './assets/LineDraw.png';
import MeasureAngelButton from './components/MeasureAngelButton';
import SelectLineButton from './components/SelectLineButton';
import AngleIcon from './assets/angle.png';
import SelectIcon from './assets/Select.png';
import QuestionMarkIcon from './assets/questionMark.png';
import HelpButton from './components/HelpButton';
import StyledButton from './components/StyledButton';
import './App.css';

function App() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);
  const [isClickedPlus, setIsClickedPlus] = useState(false);
  const [isClickedMinus, setIsClickedMinus] = useState(false);

  useEffect(() => {
    const openStreetLayer = new TileLayer({
      source: new OSM(),
      visible: true,
      title: 'OpenStreetMap',
    });

    const transportMap = new TileLayer({
      source: new XYZ({
        url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
        attributions: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }),
      visible: true,
      title: 'Transport'
    });

    const humanitarianMap = new TileLayer({
      source: new XYZ({
        url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        attributions: '© OpenStreetMap contributors. Tiles courtesy of Humanitarian OpenStreetMap Team',
      }),
      visible: false,
      title: 'Humanitarian',
    });

    const vectorSource = new VectorSource();
    const newVectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const initialMap = new Map({
      target: mapRef.current,
      layers: [transportMap, openStreetLayer, humanitarianMap, newVectorLayer],
      view: new View({
        center: fromLonLat([16.611432, 49.193756]),
        zoom: 9,
        maxZoom: 11,
        minZoom: 4,
      }),
    });

    setMap(initialMap);
    setVectorLayer(newVectorLayer);

    return () => initialMap.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (map) {
      const view = map.getView();
      if (isClickedPlus) {
        view.animate({
          zoom: view.getZoom() + 1,
          duration: 250
        });
        setIsClickedPlus(false);
      }
    }
  }, [isClickedPlus, map]);

  useEffect(() => {
    if (map) {
      const view = map.getView();
      if (isClickedMinus) {
        view.animate({
          zoom: view.getZoom() - 1,
          duration: 250
        });
        setIsClickedMinus(false);
      }
    }
  }, [isClickedMinus, map]);

  const changeMapStyle = (styleTitle) => {
    if (!map) return;
    map.getLayers().forEach((layer) => {
      if (layer.get('title')) {
        layer.setVisible(layer.get('title') === styleTitle);
      }
    });
  };

  return (
    <div className='relative w-full h-screen'>
      <div ref={mapRef} className='relative w-full h-screen'></div>
      {/*left UI bar */}
      <div className='absolute left-4 top-28'>
        <HelpButton>{QuestionMarkIcon}</HelpButton> 
      </div>
      {/*right UI bar */}
      <div className='absolute right-4 top-28 flex flex-col rounded'>
        <StyledButton setClicked={setIsClickedPlus}>{PlusIcon}</StyledButton>
        <StyledButton setClicked={setIsClickedMinus}>{MinusIcon}</StyledButton>
        <LayersButton changeMapStyle={changeMapStyle}>{LayerIcon}</LayersButton>
      </div>
      {/*middle UI bar */}
      <div className='absolute left-1/2 bottom-4 transform -translate-x-1/2 flex space-x-2'>
        <DrawLineButton map={map} vectorLayer={vectorLayer}>{DrawLineIcon}</DrawLineButton>
        <SelectLineButton>{SelectIcon}</SelectLineButton>
        <MeasureAngelButton>{AngleIcon}</MeasureAngelButton>
      </div>
    </div>
  );
}

export default App;