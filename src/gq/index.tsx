import React, { useEffect, useReducer } from "react";
import { Chance } from "chance";
import { formatRelative } from "date-fns";

const chance = new Chance();

const statuses = ["processing", "done", "queued"] as const;

const generateJob = (job: Partial<JobApi> = {}): JobApi => ({
  id: chance.guid(),
  status: chance.pickone([...statuses]),
  queuedAt: (
    chance.date({
      string: false,
      year: 2021,
      month: 7,
      day: chance.integer({ min: 4, max: 8 }),
    }) as Date
  ).toISOString(),
  completedAt: (
    chance.date({
      string: false,
      year: 2021,
      month: 7,
      day: chance.integer({ min: 4, max: 8 }),
    }) as Date
  ).toISOString(),
  ...job,
});

const fetchJob = (jobId: Job["id"]): Promise<JobApi> =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(generateJob({ id: jobId })),
      chance.integer({ min: 200, max: 3000 })
    )
  );

const fetchJobs = (): Promise<JobApi[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          Array.from(Array(chance.integer({ min: 3, max: 10 }))).map(() =>
            generateJob()
          )
        ),
      chance.integer({ min: 200, max: 3000 })
    )
  );

type DateString = `${string}`;

type JobApi = {
  id: string;
  status: typeof statuses[number];
  queuedAt: DateString;
  completedAt: DateString;
};

type Job = JobApi & { refreshing: boolean /* refresh: () => void */ };

type State = { loading: true } | { loading: false; jobs: Job[] };

type SortPayload = {
  direction: "ascending" | "descending";
  key: keyof Pick<JobApi, "queuedAt" | "completedAt">;
};

type Action =
  | { type: "set-jobs"; payload: JobApi[] }
  | { type: "start-refresh-job"; payload: Job["id"] }
  | { type: "finish-refresh-job"; payload: JobApi }
  | { type: "sort"; payload: SortPayload };

const initialState: State = { loading: true };

const jobReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "set-jobs":
      return {
        loading: false,
        jobs: action.payload.map((job) => ({ ...job, refreshing: false })),
      };
    case "start-refresh-job":
      if (state.loading)
        throw new Error("cannot refresh job while loading jobs");
      return {
        loading: false,
        jobs: state.jobs.map(
          (job): Job =>
            job.id === action.payload ? { ...job, refreshing: true } : job
        ),
      };
    case "finish-refresh-job":
      if (state.loading)
        throw new Error("cannot finish refresh job while loading jobs");
      return {
        loading: false,
        jobs: state.jobs.map(
          (job): Job =>
            job.id === action.payload.id
              ? { ...action.payload, refreshing: false }
              : job
        ),
      };
    case "sort":
      if (state.loading) throw new Error("cannot sort jobs while loading jobs");
      return {
        loading: false,
        jobs: [...state.jobs].sort(
          (a, b) =>
            // -1 = re-order
            // 0/1 = same
            // a > b = 1
            // b > a = -1
            (new Date(a[action.payload.key]).getTime() -
              new Date(b[action.payload.key]).getTime()) *
            (action.payload.direction === "ascending" ? 1 : -1)
        ),
      };
  }
};

const JobsTable = ({
  jobs,
  handleSort,
  handleRefresh,
}: {
  jobs: Job[];
  handleSort: (payload: SortPayload) => () => void;
  handleRefresh: (jobId: Job["id"]) => () => void;
}) => (
  <table className="min-w-full divide-y">
    <thead>
      <tr>
        <th className="text-left">{"id"}</th>
        <th className="text-left">{"status"}</th>
        <th className="text-left">{"queued at"}</th>
        <th className="text-left">
          {"completed at"}
          <button
            onClick={handleSort({
              key: "completedAt",
              direction: "descending",
            })}
          >
            sort
          </button>
        </th>
        <th className="text-left">{"re-load"}</th>
      </tr>
    </thead>
    <tbody className="divide-y">
      {jobs.map((job) => (
        <tr key={job.id}>
          <td>{job.id}</td>
          <td>{job.status}</td>
          <td>{formatRelative(new Date(job.queuedAt), new Date())}</td>
          <td>{formatRelative(new Date(job.completedAt), new Date())}</td>
          <td>
            {job.refreshing ? (
              "..."
            ) : (
              <button onClick={handleRefresh(job.id)}>{"refresh"}</button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const GreatQuestion = () => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  useEffect(() => {
    fetchJobs()
      .then((jobs) => dispatch({ type: "set-jobs", payload: jobs }))
      .catch(console.error);
  }, []);

  const handleRefresh = (jobId: Job["id"]) => () => {
    dispatch({ type: "start-refresh-job", payload: jobId });

    fetchJob(jobId)
      .then((job) => dispatch({ type: "finish-refresh-job", payload: job }))
      .catch(console.error);
  };

  const handleSort = (payload: SortPayload) => () => {
    dispatch({ type: "sort", payload });
  };

  return (
    <div>
      {state.loading ? <span>{"Loading..."}</span> : null}
      {"jobs" in state ? (
        <JobsTable {...{ jobs: state.jobs, handleRefresh, handleSort }} />
      ) : null}
    </div>
  );
};
