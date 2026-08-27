//
//  SkeletonViews.swift
//  mobile_ios
//
//  Created for UI/UX Enhancement
//

import SwiftUI

struct SkeletonView: View {
    @State private var isAnimating = false
    
    var body: some View {
        Rectangle()
            .fill(
                LinearGradient(
                    colors: [
                        Color.gray.opacity(0.3),
                        Color.gray.opacity(0.1),
                        Color.gray.opacity(0.3)
                    ],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .mask(
                Rectangle()
                    .fill(
                        LinearGradient(
                            colors: [.clear, .white, .clear],
                            startPoint: .leading,
                            endPoint: .trailing
                        )
                    )
                    .rotationEffect(.degrees(70))
                    .offset(x: isAnimating ? 400 : -400)
            )
            .onAppear {
                withAnimation(
                    Animation.linear(duration: 1.5)
                        .repeatForever(autoreverses: false)
                ) {
                    isAnimating = true
                }
            }
    }
}

struct SkeletonBox: View {
    var width: CGFloat? = nil
    var height: CGFloat = 20
    
    var body: some View {
        SkeletonView()
            .frame(width: width, height: height)
            .cornerRadius(4)
    }
}

struct SkeletonText: View {
    var lines: Int = 1
    var lineHeight: CGFloat = 16
    var lineSpacing: CGFloat = 8
    
    var body: some View {
        VStack(alignment: .leading, spacing: lineSpacing) {
            ForEach(0..<lines, id: \.self) { index in
                SkeletonBox(
                    width: index == lines - 1 ? 200 : nil,
                    height: lineHeight
                )
            }
        }
    }
}

struct SkeletonCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                SkeletonBox(width: 120, height: 20)
                Spacer()
                SkeletonBox(width: 80, height: 20)
            }
            SkeletonText(lines: 2)
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
        .shadow(radius: 2)
    }
}

struct SkeletonList: View {
    var itemCount: Int = 5
    
    var body: some View {
        VStack(spacing: 8) {
            ForEach(0..<itemCount, id: \.self) { _ in
                SkeletonCard()
            }
        }
    }
}

struct SkeletonCircle: View {
    var size: CGFloat = 48
    
    var body: some View {
        SkeletonView()
            .frame(width: size, height: size)
            .clipShape(Circle())
    }
}
