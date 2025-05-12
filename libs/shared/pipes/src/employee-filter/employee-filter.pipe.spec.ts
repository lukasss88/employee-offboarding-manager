import { EmployeeFilterPipe } from './employee-filter.pipe';
import { mockEmployees } from '@shared/testing';

describe('EmployeeFilterPipe', () => {
  let pipe: EmployeeFilterPipe;

  beforeEach(() => {
    pipe = new EmployeeFilterPipe();
  });

  it('should return all employees when searchTerm is empty', () => {
    const result = pipe.transform(mockEmployees, '');
    expect(result).toEqual(mockEmployees);
  });

  it('should filter employees by name correctly', () => {
    const result = pipe.transform(mockEmployees, 'John');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
  });

  it('should filter employees by email correctly', () => {
    const result = pipe.transform(mockEmployees, 'jane.smith');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should filter employees by department correctly', () => {
    const result = pipe.transform(mockEmployees, 'hr');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });

  it('should filter employees by status correctly', () => {
    const result = pipe.transform(mockEmployees, 'active');
    expect(result.length).toBe(2);
  });

  it('should filter employees by equipment correctly', () => {
    const result = pipe.transform(mockEmployees, 'laptop');
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
  });

  it('should handle trimming whitespace correctly', () => {
    const result = pipe.transform(mockEmployees, '  john  ');

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1');
  });

  it('should return empty array when no matches found', () => {
    const result = pipe.transform(mockEmployees, 'nonexistent');

    expect(result.length).toBe(0);
  });
});
