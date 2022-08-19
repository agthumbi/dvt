import { createSlice } from "@reduxjs/toolkit";

export const memSlice=createSlice({
    name:'memo',
    initialState:{
        defaultArtist:[],
        topTracks:[],
        searchArtist:[]
    },
    reducers:{
        loadDefaultArtist:(state,action)=>{
            state.defaultArtist=action.payload
        },
        loadTopTracks:(state,action)=>{
            state.topTracks=action.payload
        },
        loadSearchArtist:(state,action)=>{
            state.searchArtist=action.payload
        },
        clearSearchArtist:(state,action)=>{
            state.searchArtist=action.payload
        },
    }
})
export const{loadDefaultArtist,loadTopTracks,loadSearchArtist,clearSearchArtist}=memSlice.actions

export default memSlice.reducer