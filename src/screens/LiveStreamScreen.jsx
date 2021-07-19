import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Screen from '../components/fragments/Screen';
// import KanisaLiveStreamCard from "../components/legacy/KanisaLiveStreamCard";
import ListEmpty from '../components/fragments/ListEmpty';
import ListLoading from '../components/fragments/ListLoading';
// import { loadStreams } from "../store/actions/streamsActions";

export default function LiveStreamScreen() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const streams = state.streams.list;
  const busy = state.streams.busy;

  useEffect(() => {
    // dispatch(loadStreams());
  }, [dispatch]);

  return (
    <Screen title='Live Stream'>
      {/* {streams.map(({ id, service, url }) => {
        return (
          <KanisaLiveStreamCard
            key={`${id}`}
            name={service?.name}
            venue={service?.venue}
            desc={service?.description}
            link={url}
          />
        );
      })} */}
      {!busy && streams.length < 1 && <ListEmpty />}
      {busy && <ListLoading />}
    </Screen>
  );
}
