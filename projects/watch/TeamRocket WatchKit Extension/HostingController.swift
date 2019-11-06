//
//  HostingController.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 12/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import WatchKit
import Foundation
import SwiftUI

class HostingController: WKHostingController<AnyView> {

    override var body: AnyView {
        let viewModel = ViewModel()
        return AnyView(ContentView().environmentObject(viewModel))
    }
}
