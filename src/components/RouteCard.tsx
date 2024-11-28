import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
    CardDescription
  } from '@/components/ui/card';
  import { Button } from '@/components/ui/button';

function RouteCard() {
    return (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Route</CardTitle>
              <CardDescription>placeholder.gpx</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                Start by creating a recording session
              </div>
            </CardContent>
            <CardFooter>
                <Button>Start recording</Button>
            </CardFooter>
          </Card>
        </>
      );
  }
  
  export default RouteCard;