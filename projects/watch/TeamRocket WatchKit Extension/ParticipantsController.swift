//
//  ParticipantsController.swift
//  TeamRocket WatchKit Extension
//
//  Created by Nicolas Lebrun on 13/10/2019.
//  Copyright © 2019 Nicolas Lebrun. All rights reserved.
//

import WatchKit
import Foundation
import SwiftUI

class ParticipantsController: WKHostingController<AnyView> {

    override var body: AnyView {
        let moneyCounter = MoneyCounter()
        return AnyView(ContentView().environmentObject(moneyCounter))
    }
}
