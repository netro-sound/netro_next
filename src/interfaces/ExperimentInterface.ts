import { IDataset } from '@/interfaces/DatasetInterface';
import { ITrackPrediction } from '@/interfaces/TrackInterface';

export interface IExperiment {
  id: string;
  name: string;
  description: string;
  representation_json: { [key: string]: any };
  preprocess_json: { [key: string]: any };
  dataset: IDataset;
  models: number[];
}

export interface IModel {
  id: number;
  type: 'mlp' | 'autoencoder' | 'knn' | 'svm';
  depends_on: number;
  hyper_parameters: { [key: string]: any };
  is_autoencoder: boolean;
  is_neural_network: boolean;
  train_metrics: number;
  test_metrics: number;
  validation_metrics: number;
}

export interface IMetric {
  id: number;
  f1_score: number;
  precision: number;
  recall: number;
  accuracy: number;
  support: number;
  loss: number;
  classes_report: { [key: string]: any };
}

export interface IExperimentQuery {
  id: string;
  experiment: number;
  model: number;
  query_track: string;
  user: number;
  execution_json: { [key: string]: any };
  prediction_json: [[number, string]];
  prediction_accuracy: ITrackPrediction;
}

export interface IExperimentQueryCreate {
  experiment: string;
  model: string;
  query_track: string | File;
}
