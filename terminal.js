var terminalScreen = (function() {
    
    let charset = [];
    charset.push([0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00]); //00 - space
    charset.push([0xF0,0xF0,0xF0,0xF0,0x00,0x00,0x00,0x00]); //01 - top-left corner hl
    charset.push([0x0F,0x0F,0x0F,0x0F,0x00,0x00,0x00,0x00]); //02 - top-right corner hl
    charset.push([0xFF,0xFF,0xFF,0xFF,0x00,0x00,0x00,0x00]); //03 - top hl
    charset.push([0x00,0x00,0x00,0x00,0xF0,0xF0,0xF0,0xF0]); //04 - bot-left corner hl
    charset.push([0xF0,0xF0,0xF0,0xF0,0xF0,0xF0,0xF0,0xF0]); //05 - left hl
    charset.push([0x0F,0x0F,0x0F,0x0F,0xF0,0xF0,0xF0,0xF0]); //06 - checker bltr hl
    charset.push([0xFF,0xFF,0xFF,0xFF,0xF0,0xF0,0xF0,0xF0]); //07 - inverted bot-right hl
    charset.push([0xAA,0x55,0xAA,0x55,0xAA,0x55,0xAA,0x55]); //08 - dither full
    charset.push([0x00,0x00,0x00,0x00,0xAA,0x55,0xAA,0x55]); //09 - dither bottom
    charset.push([0xAA,0x55,0xAA,0x55,0x00,0x00,0x00,0x00]); //10 - dither top
    charset.push([0x00,0x24,0x24,0x00,0x00,0x00,0x00,0x00]); //11 - quotation
    charset.push([0x00,0x1C,0x22,0x78,0x20,0x20,0x7E,0x00]); //12 - english pound
    charset.push([0x00,0x08,0x3E,0x28,0x3E,0x0A,0x3E,0x08]); //13 - dollar sign
    charset.push([0x00,0x00,0x00,0x10,0x00,0x00,0x10,0x00]); //14 - colon
    charset.push([0x00,0x3C,0x42,0x04,0x08,0x00,0x08,0x00]); //15 - question

    charset.push([0x00,0x04,0x08,0x08,0x08,0x08,0x04,0x00]); //16 - open parenthesis
    charset.push([0x00,0x20,0x10,0x10,0x10,0x10,0x20,0x00]); //17 - close parenthesis
    charset.push([0x00,0x00,0x10,0x08,0x04,0x08,0x10,0x00]); //18 - greater than
    charset.push([0x00,0x00,0x04,0x08,0x10,0x08,0x04,0x00]); //19 - less than
    charset.push([0x00,0x00,0x00,0x3E,0x00,0x3E,0x00,0x00]); //20 - equal
    charset.push([0x00,0x00,0x08,0x08,0x3E,0x08,0x08,0x00]); //21 - plus
    charset.push([0x00,0x00,0x00,0x00,0x3E,0x00,0x00,0x00]); //22 - minus
    charset.push([0x00,0x00,0x14,0x08,0x3E,0x08,0x14,0x00]); //23 - star
    charset.push([0x00,0x00,0x02,0x04,0x08,0x10,0x20,0x00]); //24 - slash
    charset.push([0x00,0x00,0x10,0x00,0x00,0x10,0x10,0x20]); //25 - semi-colon
    charset.push([0x00,0x00,0x00,0x00,0x00,0x08,0x08,0x10]); //26 - comma
    charset.push([0x00,0x00,0x00,0x00,0x00,0x18,0x18,0x00]); //27 - period
    charset.push([0x00,0x3C,0x46,0x4A,0x52,0x62,0x3C,0x00]); //28 - zero
    charset.push([0x00,0x18,0x28,0x08,0x08,0x08,0x3E,0x00]); //29 - one
    charset.push([0x00,0x3C,0x42,0x02,0x3C,0x40,0x7E,0x00]); //30 - two
    charset.push([0x00,0x3C,0x42,0x0C,0x02,0x42,0x3C,0x00]); //31 - three

    charset.push([0x00,0x08,0x18,0x28,0x48,0x7E,0x08,0x00]); //32 - four
    charset.push([0x00,0x7E,0x40,0x7C,0x02,0x42,0x3C,0x00]); //33 - five
    charset.push([0x00,0x3C,0x40,0x7C,0x42,0x42,0x3C,0x00]); //34 - six
    charset.push([0x00,0x7E,0x02,0x04,0x08,0x10,0x10,0x00]); //35 - seven
    charset.push([0x00,0x3C,0x42,0x3C,0x42,0x42,0x3C,0x00]); //36 - eight
    charset.push([0x00,0x3C,0x42,0x42,0x3E,0x02,0x3C,0x00]); //37 - nine
    charset.push([0x00,0x3C,0x42,0x42,0x7E,0x42,0x42,0x00]); //38 - a
    charset.push([0x00,0x7C,0x42,0x7C,0x42,0x42,0x7C,0x00]); //39 - b
    charset.push([0x00,0x3C,0x42,0x40,0x40,0x42,0x3C,0x00]); //40 - c
    charset.push([0x00,0x78,0x44,0x42,0x42,0x44,0x78,0x00]); //41 - d
    charset.push([0x00,0x7E,0x40,0x7C,0x40,0x40,0x7E,0x00]); //42 - e
    charset.push([0x00,0x7E,0x40,0x7C,0x40,0x40,0x40,0x00]); //43 - f
    charset.push([0x00,0x3C,0x42,0x40,0x4E,0x42,0x3C,0x00]); //44 - g
    charset.push([0x00,0x42,0x42,0x7E,0x42,0x42,0x42,0x00]); //45 - h
    charset.push([0x00,0x3E,0x08,0x08,0x08,0x08,0x3E,0x00]); //46 - i
    charset.push([0x00,0x02,0x02,0x02,0x42,0x42,0x3C,0x00]); //47 - j

    charset.push([0x00,0x44,0x48,0x70,0x48,0x44,0x42,0x00]); //48 - k
    charset.push([0x00,0x40,0x40,0x40,0x40,0x40,0x7E,0x00]); //49 - l
    charset.push([0x00,0x42,0x66,0x5A,0x42,0x42,0x42,0x00]); //50 - m
    charset.push([0x00,0x42,0x62,0x52,0x4A,0x46,0x42,0x00]); //51 - n
    charset.push([0x00,0x3C,0x42,0x42,0x42,0x42,0x3C,0x00]); //52 - o
    charset.push([0x00,0x7C,0x42,0x42,0x7C,0x40,0x40,0x00]); //53 - p
    charset.push([0x00,0x3C,0x42,0x42,0x52,0x4A,0x3C,0x00]); //54 - q
    charset.push([0x00,0x7C,0x42,0x42,0x7C,0x44,0x42,0x00]); //55 - r
    charset.push([0x00,0x3C,0x40,0x3C,0x02,0x42,0x3C,0x00]); //56 - s
    charset.push([0x00,0xFE,0x10,0x10,0x10,0x10,0x10,0x00]); //57 - t
    charset.push([0x00,0x42,0x42,0x42,0x42,0x42,0x3C,0x00]); //58 - u
    charset.push([0x00,0x42,0x42,0x42,0x42,0x24,0x18,0x00]); //59 - v
    charset.push([0x00,0x42,0x42,0x42,0x42,0x5A,0x24,0x00]); //60 - w
    charset.push([0x00,0x42,0x24,0x18,0x18,0x24,0x42,0x00]); //61 - x
    charset.push([0x00,0x82,0x44,0x28,0x10,0x10,0x10,0x00]); //62 - y
    charset.push([0x00,0x7E,0x04,0x08,0x10,0x20,0x7E,0x00]); //63 - z
    
    let cwidth = 8;
    let cheight = 8;
    let scwidth = 32;
    let scheight = 24;
    let spwidth = scwidth * cwidth;
    let spheight = scheight * cheight;
    
    let terminalCanvas = document.getElementById('terminal');
    let terminalContext = terminalCanvas.getContext('2d');
    let img = terminalContext.createImageData(spwidth, spheight);
    
    let screenChars = new Uint8Array(new ArrayBuffer(scwidth*scheight));
    screenChars.fill(9);
    
    screenChars[0] = 45;
    screenChars[1] = 42;
    screenChars[2] = 49;
    screenChars[3] = 49;
    screenChars[4] = 52;
    screenChars[5] = 0;
    screenChars[6] = 60;
    screenChars[7] = 52;
    screenChars[8] = 55;
    screenChars[9] = 49;
    screenChars[10] = 41;
    
    for (i = 11; i < 128+11; i++)
    {
        screenChars[i] = i-11;
    }
    
    function get_bit_from_pos(integer, pos)
    {
        let shift = cwidth-pos-1;
        if (shift !== 0)
            integer = integer >>> shift;
        return integer & 1;
    }
    
    function render()
    {
        for (let cy = 0; cy < scheight; cy++) {
            for (let cx = 0; cx < scwidth; cx++) {
                
                let charIndex = cy*scwidth+cx;
                let charCode = screenChars[charIndex];
                if (charCode > 127) charCode = 15;
                let invertColor = charCode > 63;
                if (invertColor) charCode = screenChars[charIndex] - 64;
                
                if (charCode != 0 || invertColor) { //dont bother rendering space unless its inverted
                    
                    for (let py = 0; py < cheight; py++) {
                        for (let px = 0; px < cwidth; px++) {
                            
                            let pxIndex = cwidth*cheight*scwidth*cy;
                            pxIndex += cwidth*cx;
                            pxIndex += cwidth*scwidth*py;
                            pxIndex += px;
                            pxIndex *= 4;
                             
                            if (invertColor ^ get_bit_from_pos(charset[charCode][py],px)) {
                                img.data[pxIndex+0] = 0;
                                img.data[pxIndex+1] = 255;
                                img.data[pxIndex+2] = 0;
                                img.data[pxIndex+3] = 255;
                            }
                        }
                    }
                }
            }
        }
        
        terminalContext.putImageData(img, 0, 0);
    }
    
    render();
})();