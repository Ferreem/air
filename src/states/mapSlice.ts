import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Map } from 'ol';

interface MapState {
  map: Map | null;
  currentStyle: string;
  showStyleButtons: boolean;
}

const initialState: MapState = {
  map: null,
  currentStyle: 'Transport',
  showStyleButtons: false,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<Map>) => {
      state.map = action.payload;
    },
    changeMapStyle: (state, action: PayloadAction<string>) => {
      state.currentStyle = action.payload;
      if (state.map) {
        state.map.getLayers().forEach((layer) => {
          // TypeScript doesn't know about the `get` method on BaseLayer, so we need to cast
          const layerAny = layer as any;
          layerAny.setVisible(layerAny.get('title') === action.payload);
        });
      }
    },
    toggleStyleButtons: (state) => {
      state.showStyleButtons = !state.showStyleButtons;
    },
  },
});

export const { setMap, changeMapStyle, toggleStyleButtons } = mapSlice.actions;

export default mapSlice.reducer;