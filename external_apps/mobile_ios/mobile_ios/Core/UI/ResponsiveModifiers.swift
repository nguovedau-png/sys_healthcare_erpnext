//
//  ResponsiveModifiers.swift
//  mobile_ios
//
//  Created for UI/UX Enhancement
//

import SwiftUI

// MARK: - Size Class Helpers
extension View {
    @ViewBuilder
    func adaptiveLayout<Compact: View, Regular: View>(
        @ViewBuilder compact: () -> Compact,
        @ViewBuilder regular: () -> Regular
    ) -> some View {
        GeometryReader { geometry in
            if geometry.size.width < 600 {
                compact()
            } else {
                regular()
            }
        }
    }
}

// MARK: - Responsive Padding
extension View {
    func responsivePadding(_ horizontalSizeClass: UserInterfaceSizeClass?) -> some View {
        self.padding(horizontalSizeClass == .compact ? 16 : 32)
    }
    
    func responsiveHorizontalPadding(_ horizontalSizeClass: UserInterfaceSizeClass?) -> some View {
        self.padding(.horizontal, horizontalSizeClass == .compact ? 16 : 32)
    }
}

// MARK: - Responsive Columns
struct ResponsiveGrid<Content: View>: View {
    @Environment(\.horizontalSizeClass) var horizontalSizeClass
    
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var columns: [GridItem] {
        if horizontalSizeClass == .compact {
            return [GridItem(.flexible())]
        } else {
            return [
                GridItem(.flexible()),
                GridItem(.flexible())
            ]
        }
    }
    
    var body: some View {
        LazyVGrid(columns: columns, spacing: 16) {
            content
        }
    }
}

// MARK: - Adaptive Stack
struct AdaptiveStack<Content: View>: View {
    @Environment(\.horizontalSizeClass) var horizontalSizeClass
    
    let content: Content
    let spacing: CGFloat
    
    init(spacing: CGFloat = 16, @ViewBuilder content: () -> Content) {
        self.spacing = spacing
        self.content = content()
    }
    
    var body: some View {
        if horizontalSizeClass == .compact {
            VStack(spacing: spacing) {
                content
            }
        } else {
            HStack(spacing: spacing) {
                content
            }
        }
    }
}
