import React from 'react';
import {Composition} from 'remotion';
import {BreadButter} from './BreadButter';
import {GoldBB} from './GoldBB';
import {MotionBB} from './MotionBB';
import {ShingleTest} from './ShingleTest';
import {CapLab} from './CapLab';
import {CapLab2} from './CapLab2';
import {RealBB} from './RealBB';
import {RealBBRoll} from './RealBBRoll';
import {CapLab3} from './CapLab3';
import {RealBBv6} from './RealBBv6';

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
  <Composition id="RealBBv6" component={RealBBv6} durationInFrames={1380} fps={30} width={1080} height={1920} />
  <Composition id="CapLab3" component={CapLab3} durationInFrames={960} fps={30} width={1080} height={1920} />
  <Composition id="RealBB" component={RealBB} durationInFrames={1380} fps={30} width={1080} height={1920} />
  <Composition id="RealBBRoll" component={RealBBRoll} durationInFrames={1380} fps={30} width={1080} height={1920} />
  <Composition id="CapLab2" component={CapLab2} durationInFrames={1080} fps={30} width={1080} height={1920} />
  <Composition id="CapLab" component={CapLab} durationInFrames={1200} fps={30} width={1080} height={1920} />
  <Composition id="ShingleTest" component={ShingleTest} durationInFrames={450} fps={30} width={1080} height={1920} />
  <Composition id="MotionBB" component={MotionBB} durationInFrames={1710} fps={30} width={1080} height={1920} />
  <Composition id="GoldBB" component={GoldBB} durationInFrames={1710} fps={30} width={1080} height={1920} />
    </>
  );
};
