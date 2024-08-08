#include <iostream>
#include <cmath>

//FDS
double triangleArea(int x1, int y1, int x2, int y2, int x3, int y3) {
    return std::abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0;
}

int main() {
    int x1, y1, x2, y2, x3, y3;
    std::cin >> x1 >> y1 >> x2 >> y2 >> x3 >> y3;
    
    double area = triangleArea(x1, y1, x2, y2, x3, y3);
    std::cout << area << std::endl;
    
    return 0;
}

