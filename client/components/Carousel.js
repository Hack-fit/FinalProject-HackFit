import * as React from 'react';
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function CarouselCard() {
    const width = Dimensions.get('window').width;
    const images = [
        require('../assets/gym1.jpg'),
        require('../assets/Banner1.jpg'),
        require('../assets/gym3.jpg'),
        require('../assets/gym4.jpg'),
        require('../assets/farel.jpeg')
    ];

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={2000}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={item}
                            style={{ width: width, height: width / 2 }}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />
        </View>
    );
}
