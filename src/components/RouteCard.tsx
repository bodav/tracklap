import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from "zod";
import getSegments from '@/lib/segment';

function RouteCard() {

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const formSchema = z.object({
    file: z.instanceof(FileList)
      .refine((fileList) => fileList.length === 1, 'GPX file is required')
      .refine((files) => files?.[0]?.name.endsWith(".gpx"), "Only .gpx files are accepted.")
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB."),
    trimStart: z.coerce.number().positive({
      message: 'Start trim must be positive',
    }).optional(),
    trimEnd: z.coerce.number().positive({
      message: 'End trim must be positive',
    }).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const fileRef = form.register("file");

  const handleSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    console.log(data);
    const seg = await getSegments({ 
      gpx: data.file[0],
      trimStart: data.trimStart || 0,
      trimEnd: data.trimEnd || 0,
    });

    console.log(seg);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Route</CardTitle>
        </CardHeader>
        <CardContent>
          <div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-3'>

                <div>
                  <FormField
                    control={form.control}
                    name='file'
                    render={() => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold'>
                          Strava GPX file
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='file'
                            accept='.gpx'
                            {...fileRef}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name='trimStart'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold'>
                          Trim start
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='meters'
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
                    name='trimEnd'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='uppercase text-xs font-bold'>
                          Trim end
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='meters'
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className='w-full' disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Starting..." : "Start"}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default RouteCard;