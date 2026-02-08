import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  banners: [
    {
      id: 1,
      image: '/src/assets/images/Banner/banner01.jpg',
      title: '',
      discount: '',
      startDate: null,
      endDate: null,
      isActive: true,
      uploadedAt: new Date().toISOString(),
    },
    {
      id: 2,
      image: '/src/assets/images/Banner/banner02.jpg',
      title: '',
      discount: '',
      startDate: null,
      endDate: null,
      isActive: true,
      uploadedAt: new Date().toISOString(),
    },
    {
      id: 3,
      image: '/src/assets/images/Banner/banner03.jpg',
      title: '',
      discount: '',
      startDate: null,
      endDate: null,
      isActive: true,
      uploadedAt: new Date().toISOString(),
    },
  ],
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    addBanner: (state, action) => {
      const newBanner = {
        id: Date.now(),
        ...action.payload,
        uploadedAt: new Date().toISOString(),
      };
      state.banners.push(newBanner);
    },
    updateBanner: (state, action) => {
      const { id, ...updates } = action.payload;
      const bannerIndex = state.banners.findIndex(banner => banner.id === id);
      if (bannerIndex !== -1) {
        state.banners[bannerIndex] = { ...state.banners[bannerIndex], ...updates };
      }
    },
    deleteBanner: (state, action) => {
      state.banners = state.banners.filter(banner => banner.id !== action.payload);
    },
    setBannerSchedule: (state, action) => {
      const { id, startDate, endDate } = action.payload;
      const banner = state.banners.find(banner => banner.id === id);
      if (banner) {
        banner.startDate = startDate;
        banner.endDate = endDate;
      }
    },
    toggleBannerActive: (state, action) => {
      const banner = state.banners.find(banner => banner.id === action.payload);
      if (banner) {
        banner.isActive = !banner.isActive;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addBanner,
  updateBanner,
  deleteBanner,
  setBannerSchedule,
  toggleBannerActive,
  setLoading,
  setError,
} = bannerSlice.actions;

export default bannerSlice.reducer;
