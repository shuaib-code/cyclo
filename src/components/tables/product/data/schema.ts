import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

type TTask = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};
export default TTask;
