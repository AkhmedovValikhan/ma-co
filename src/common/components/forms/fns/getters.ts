import { FieldState } from '../abstract';

export const allValid = (...fields: FieldState<any>[]) => !fields.some(f => !f.valid);
export const anyDirty = (...fields: FieldState<any>[]) => fields.some(f => f.dirty);
export const allDirty = (...fields: FieldState<any>[]) => fields.every(f => f.dirty);
export const allPristine = (...fields: FieldState<any>[]) => !anyDirty(...fields);
