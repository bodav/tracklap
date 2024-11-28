import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

function SegmentsCard() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Segments</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='w-full'>
                        <div className='grid grid-cols-5 gap-2 my-2'>
                            <div className='w-9'>
                                <span className='font-bold mr-4'>#1</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">6453</span>
                                <span className='text-sm font-thin'>m</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">14:23</span>
                                <span className='text-sm font-thin'>/min</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">340</span>
                                <span className='text-sm font-thin'>w</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">180</span>
                                <span className='text-sm font-thin'>hr</span>
                            </div>

                            <div className='w-9'>
                                <span className='font-bold'>#20</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">6453</span>
                                <span className='text-sm font-thin'>m</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">4:23</span>
                                <span className='text-sm font-thin'>/min</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">340</span>
                                <span className='text-sm font-thin'>w</span>
                            </div>
                            <div className='text-right'>
                                <span className="mr-1">180</span>
                                <span className='text-sm font-thin'>hr</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default SegmentsCard;