# Kernel (image processing)

The kernel or convolutional matrix process is a mathematical process based on the classical convolutional operation, in which a mask is applied on subsections of the images in order the extract features as vertical or horizontal lines or transform an image to blur it or sharpen it. The following mathematical formula formalizes the kernel process.

> :Formula align=center
>
> ```
> g(x,y) = w * f(x,y) = \sum_{dx=-a}^a \sum_{dy=-b}^b w(dx,dy)f(x+dx,y+dy)
> ```

Where g(x,y)  is the function that returns the pixel (x,y) of the filtered image, f(x,y) is function that returns the pixel (x,y) of the original image, and w is the filter that we want to apply that has size (2*a+1, 2*b)+1. But what does the previous function mean?, let's go through the process with a simple example, suppose that the original image is the following matrix of size 4x4 and the kernel w is of size 3x3.

> :Formula align=center
>
> f = \begin{pmatrix}
> 1 & 2 & 3 & 4 `\\`       
> 5 & 6 & 7 & 8 `\\`
> 9 & 10 & 11 & 12 `\\`  
> 13 & 14 & 15 & 16 
> \end{pmatrix}
> w = \begin{pmatrix}
> 1 & 2 & 3 `\\`
> 4 & 5 & 6 `\\` 
> 7 & 8 & 9 
> \end{pmatrix}

Then if we want to calculate g(2,2), we need to place the matrix w over f and center it on the position (2,2), and then multiply the elements of f that are covered by w elementwise and then add them up , which gives us the following calculation.

> :Formula align=center
>
> ```
> g(2,2) = 1*1 + 2*2 + 3*3 + 4*5 + 5*6 + 6*7 + 7*9 + 8*10 + 9*11 = 348
> ```

But we have a big problem if we want to calculate the value of the position (1,1) of the filtered image, because we can not center the kernel matrix on the position (1,1) or we will end up with values outside f, so the general technique is to add (n-1)/2 rows and columns of zeros around the initial matrix, where n is the size of the kernel. So if we want to calculate g(1,1) we will have the following result.

> :Formula align=center
>
> ```
> g(1,1) = 1*0 + 2*0 + 3*0 + 4*0 + 5*1 + 6*2 + 7*0 + 8*5 + 9*6 = 111
> ```

> :ToCPrevNext