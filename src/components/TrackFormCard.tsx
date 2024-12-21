import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import getTrack from "@/lib/track";
import { formSchema } from "@/lib/schemas";

function TrackFormCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const fileRef = form.register("file");

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    data
  ) => {
    console.log(data);

    const track = await getTrack({
      gpx: data.file[0],
      trimStart: data.trimStart || 0,
      trimEnd: data.trimEnd || 0
    });

    console.log(track);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Track</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-3">
                <div>
                  <FormField
                    control={form.control}
                    name="file"
                    render={() => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold">
                          Strava GPX file
                        </FormLabel>
                        <FormControl>
                          <Input type="file" accept=".gpx" {...fileRef} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="trimStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold">
                          Trim start
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="meters"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="trimEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold">
                          Trim end
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="meters"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  className="w-full"
                  disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Calculating..." : "Calculate"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default TrackFormCard;
