import React from 'react';
import {Composition} from 'remotion';
import {BreadButter} from './BreadButter';
import {GoldBB} from './GoldBB';
import {MotionBB} from './MotionBB';
import {ShingleTest} from './ShingleTest';

export const Root: React.FC = () => {
  return (
    <>
    <Composition
      id="BreadButter"
      component={BreadButter}
      durationInFrames={1710}
      fps={30}
      width={1080}
      height={1920}
    />
  <Composition id="ShingleTest" component={ShingleTest} durationInFrames={450} fps={30} width={1080} height={1920} />
  <Composition id="MotionBB" component={MotionBB} durationInFrames={1710} fps={30} width={1080} height={1920} />
  <Composition id="GoldBB" component={GoldBB} durationInFrames={1710} fps={30} width={1080} height={1920} />
    </>
  );
};
