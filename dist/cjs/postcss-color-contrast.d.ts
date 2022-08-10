import type { PluginCreator as PluginCreatorFull } from 'postcss';
import { PluginCreatorStub } from './postcss';
declare type PluginCreator<T> = any extends PluginCreatorFull<T> ? PluginCreatorStub<T> : PluginCreatorFull<T>;
declare const postcssColorContrast: PluginCreator<{}>;
export default postcssColorContrast;
